package com.arevas.WelcomeToTorun;

import com.arevas.WelcomeToTorun.domain.*;
import com.arevas.WelcomeToTorun.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class WelcomeToTorunApplication implements CommandLineRunner {

	private final ArticleRepository articleRepository;
	private final SportTeamRepository sportTeamRepository;
	private final TouristAttractionRepository touristAttractionRepository;
	private final RoleRepository roleRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder encoder;

	public WelcomeToTorunApplication(ArticleRepository articleRepository, SportTeamRepository sportTeamRepository, TouristAttractionRepository touristAttractionRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder encoder) {
		this.articleRepository = articleRepository;
		this.sportTeamRepository = sportTeamRepository;
		this.touristAttractionRepository = touristAttractionRepository;
		this.roleRepository = roleRepository;
		this.userRepository = userRepository;
		this.encoder = encoder;
	}

	public static void main(String[] args) {
		SpringApplication.run(WelcomeToTorunApplication.class, args);
	}

	@Override
	public void run(String... args) {
		if (articleRepository.findAll().isEmpty()) {
			articleRepository.save(new Article("Możesz uratować życie drugiej osoby", "Mimo postępu medycyny nie udało się dotąd stworzyć substancji, która w pełni zastąpiłaby ludzką krew. W czwartek (19 maja) specjalny ambulans Regionalnego Centrum Krwiodawstwa i Krwiolecznictwa w Bydgoszczy, w którym można honorowo oddać krew, stanie na placu Teatralnym przed Urzędem Marszałkowskim w Toruniu. Akcję potwarzamy w każdy trzeci czwartek miesiąca", "https://ddtorun.pl/news_foto/2022/0518/347524.jpg"));
			articleRepository.save(new Article("Jelcze znikną z toruńskich ulic", "Dla wielu mieszkańców Torunia jelcze do kultowe autobusy, które po naszym mieście jeździły przez kilkadziesiąt lat. Niestety to koniec tych pojazdów we flocie MZK. Miejska spółka informowała o tym od dawna. Teraz stawia na pojazdy firm Solaris i MAN, a także na autobusy hybrydowe. Jelcze definitywnie z toruńskich ulic mają zniknąć jeszcze w maju.", "https://ddtorun.pl/news_foto/2022/0521/347953.jpg"));
			articleRepository.save(new Article("Zbliża się EnergaCAMERIMAGE", "12 listopada 2022 r. rozpocznie się jubileuszowa, 30. edycja Międzynarodowego Festiwalu Filmowego EnergaCAMERIMAGE. Jest to jeden z największych na świecie festiwali filmowych poświęcony sztuce operatorów filmowych. Podczas Camerimage odbywają się spotkania z operatorami filmowymi, projekcje filmowe, a także warsztaty i seminaria prowadzone przez wybitnych operatorów i reżyserów.", "https://ddtorun.pl/news_foto/2022/0513/346993.jpg"));
		}

		if (touristAttractionRepository.findAll().isEmpty()) {
			touristAttractionRepository.save(new TouristAttraction("Stare Miasto w Toruniu", "Stare Miasto", "Stary Rynek", "Toruńska starówka wpisana jest na Listę Kulturowego Dziedzictwa UNESCO. Spacer nie pozostawia wątpliwości, że to jak najbardziej zasłużone wyróżnienie – w końcu w Toruniu znajdziecie aż 1000 chronionych zabytków.", "https://cdn.pixabay.com/photo/2020/02/17/21/47/torun-4857967__340.jpg"));
			touristAttractionRepository.save(new TouristAttraction("Muzeum Toruńskiego Piernika", "Stare Miasto", "Strumykowa 4", "Muzeum Toruńskiego Piernika ulokowano w najprawdziwszej fabryce pierników, której współczesnym dziedzicem” jest firma cukiernicza Kopernik.","https://cdn.pixabay.com/photo/2017/12/17/21/15/gingerbread-3024970_960_720.jpg"));
			touristAttractionRepository.save(new TouristAttraction("Dom Mikołaja Kopernika", "Stare Miasto", "M. Kopernika 15", "Mikołaj Kopernik urodził się w Toruniu, dlatego też tu, w dwóch zabytkowych kamienicach należących niegdyś do jego rodziny znajduje się muzeum prezentujące sylwetkę wielkiego astronoma i jego dokonania.", "https://cdn.pixabay.com/photo/2021/08/28/16/10/church-6581360_960_720.jpg"));
		}

		if (sportTeamRepository.findAll().isEmpty()) {
			sportTeamRepository.save(new SportTeam("KS Toruń", "Pera Jonssona 7", "Motoarena Toruń im. Mariana Rosego", LocalDate.parse("1962-01-01"), "Żółto-niebieskie-białe", "Żużel", "W 1962 roku powstał Klub Sportowy „Apator”, który swoją nazwę wziął od Pomorskich Zakładów Wytwórczych Aparatury Niskiego Napięcia. W latach 60. pierwsze medale dla toruńskiego żużla zdobył między innymi Marian Rose. Popularny Maryś osiągnął sukcesy zarówno na krajowym podwórku, jak i na arenie międzynarodowej. Jego największym sukcesem był złoty medal drużynowych mistrzostw świata z 1966 roku. W tym samym sezonie Rose zdobył srebrny medal indywidualnych mistrzostw Polski. Jego karierę przerwał wypadek 19 kwietnia 1970 roku na torze w Rzeszowie, w którym torunianin poniósł śmierć.", "https://cdn.pixabay.com/photo/2017/09/28/20/41/speedway-2796881__340.jpg"));
			sportTeamRepository.save(new SportTeam("Twarde Pierniki Toruń", "Generała Józefa Bema 73-89", "Arena Toruń", LocalDate.parse("2004-01-01"), "Czerwono-biało-niebieskie", "Koszykówka", "W październiku 2004 drużyna MMKS-u VIII LO SIDEn Toruń zadebiutowała w rozgrywkach III ligi. W 2005 klub, który powstał z inicjatywy grona zapaleńców, przeistoczył się w Stowarzyszenie MMKS Pierniki. Połączyła ich prawdziwa idea reaktywacji toruńskiej koszykówki w ogólnopolskich rozgrywkach seniorskich, a także zbudowanie pełnej struktury szkolenia dzieci i młodzieży, obejmującej wszystkie kategorie wiekowe. W 2013 prowadzenie drużyny przejęła nowo powstała spółka akcyjna Basket Toruń, którą następnie przemianowano na Twarde Pierniki Toruń, historyczny przydomek toruńskich koszykarzy.", "https://cdn.pixabay.com/photo/2014/09/09/12/46/basketball-440057__340.jpg"));
		}

		if (roleRepository.findAll().isEmpty()) {
			roleRepository.save(new Role(RoleUtils.ROLE_USER));
			roleRepository.save(new Role(RoleUtils.ROLE_ADMIN));
		}

		if (userRepository.findAll().isEmpty()) {
			Set<Role> userRoles = new HashSet<>();
			Role userRole = roleRepository.findByName(RoleUtils.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Nie znaleziono roli użytkownika."));
			userRoles.add(userRole);

			Set<Role> adminRoles = new HashSet<>();
			Role adminRole = roleRepository.findByName(RoleUtils.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Nie znaleziono roli użytkownika."));
			adminRoles.add(adminRole);

			User user = new User("user", "user.test@poczta.pl", encoder.encode("usertest"));
			user.setRoles(userRoles);
			userRepository.save(user);

			User admin = new User("admin","admin.test@poczta.pl", encoder.encode("admintest"));
			admin.setRoles(adminRoles);
			userRepository.save(admin);
		}

	}

}
