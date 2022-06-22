# WelcomeToTorun
Aplikacja o tematyce mojego rodzinnego miasta zbudowana w oparciu o języki: Java (Spring, Hibernate) oraz JavaScript (React, Redux)

# Prawidłowa konfiguracja projektu
- warstwa backend
	- utworzenie połączenia z bazą danych - osobiście korzystam i polecam MySQL
	- utworzenie bazy danych poprzez wykonanie polecenia w konsoli: <code>CREATE DATABASE welcome CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;</code>
	- uchromienie kodu w klasie <code>WelcomeToTorunApplication</code>
- warstwa frontend
	- instalacja Node.js na komputerze w przypadku braku platformy
	- w folderze webapp wykonanie polecenia <code>npm install</code>
	- w folderze webapp wykonanie polecania <code>npm start</code>

Projekt został skonfigurowany i poprawanie uruchomiony.


# Przykładowe dane do logowania
	{
	    "login": "user",
	    "password": "usertest"
	}
	{
	    "login": "admin",
	    "password": "admintest"
	}

# Opis funkcjonalności
- logowanie, rejestracja
- użytkownik
	a) przeglądanie materiałów dot. Torunia -> artykułów, atrakcji turystycznych, klubów sportowych
	b) możliwość komentowania i oceny dostępnych materiałów
	c) możliwość zapisania materiałów w formacie PDF
- administrator
	a) tworzenie, edycja, usuwania materiałów w aplikacji

# Planowane aktualizacje
- panel administrowania użytkowników
- rejestracja z użyciem potwierdzenia mailowego
- logowanie za pomocą zewnętrznych serwisów np. Google, Facebook
