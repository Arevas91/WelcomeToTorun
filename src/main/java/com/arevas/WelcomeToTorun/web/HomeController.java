package com.arevas.WelcomeToTorun.web;

import com.arevas.WelcomeToTorun.domain.Role;
import com.arevas.WelcomeToTorun.domain.RoleUtils;
import com.arevas.WelcomeToTorun.domain.User;
import com.arevas.WelcomeToTorun.repository.RoleRepository;
import com.arevas.WelcomeToTorun.repository.UserRepository;
import com.arevas.WelcomeToTorun.security.JWT.JwtUtils;
import com.arevas.WelcomeToTorun.security.PAYLOAD.JwtResponse;
import com.arevas.WelcomeToTorun.security.PAYLOAD.LoginRequest;
import com.arevas.WelcomeToTorun.security.PAYLOAD.MessageResponse;
import com.arevas.WelcomeToTorun.security.PAYLOAD.SignupRequest;
import com.arevas.WelcomeToTorun.security.USER.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class HomeController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public HomeController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("auth/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Nazwa użytkownika jest już zajęta!"));
        }
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email jest już zajęty!"));
        }
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleUtils.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Nie znaleziono roli użytkownika."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if ("admin".equals(role)) {
                    Role adminRole = roleRepository.findByName(RoleUtils.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Nie znaleziono roli użytkownika."));
                    roles.add(adminRole);
                } else {
                    Role userRole = roleRepository.findByName(RoleUtils.ROLE_USER)
                            .orElseThrow(() -> new RuntimeException("Error: Nie znaleziono roli użytkownika."));
                    roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Rejestracja użytkownika zakończyła się pomyślnie!"));
    }

}
