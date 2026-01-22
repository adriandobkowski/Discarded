# App

## Uruchomienie (Docker)

Wymagania: zainstalowany Docker + Docker Compose.

Uruchomienie aplikacji (z katalogu repozytorium, tam gdzie jest `docker-compose.yml`):

```bash
docker compose up
```

Po starcie:

- Frontend: `http://localhost:4200`
- Mock API (json-server-auth): `http://localhost:3000`

Dane w `db.json` są przechowywane w wolumenie Dockera (`json_data`) i nie znikają po restarcie kontenerów.
Przy pierwszym uruchomieniu, jeśli wolumen jest pusty, `db.json` zostanie automatycznie skopiowany z `app/db.json` do wolumenu.

## ✅ Realizacja wymagań projektowych

### Backend (REST API)

- Zarządzanie danymi zalogowanego użytkownika (GET, PUT)
- Zarządzanie danymi z co najmniej jedną relacją (pełny CRUD)
- Autoryzacja endpointów:
  - Endpointy publiczne
  - Endpointy wymagające zalogowania

### Frontend – Interfejs

- Widok przeglądarkowy i responsywny mobilny (SCSS)
- Czytelna komunikacja akcji użytkownika (UX „Nie każ mi myśleć”)
- Nowoczesne standardy stylowania / biblioteka UI
- Globalny system powiadomień (toast)
- Potwierdzanie operacji krytycznych (modal)
- Zmiana motywu kolorystycznego (jasny/ciemny)

### Frontend – Nawigacja i widoki

- Widok master–detail
- Edycja i usuwanie w widoku szczegółowym
- Widok „Page not found”
- Widoki zabezpieczone autoryzacją
- Informacja o zalogowanym użytkowniku w navbarze + edycja danych
- Możliwość zawieszenia/odwieszenia konta
- Role i uprawnienia (np. admin/user)

### Wyświetlanie danych

- Wyświetlanie wszystkich danych
- Sortowanie (alfabetyczne, data, liczby)
- Filtrowanie (min. 3 pola, różne typy)
- Paginacja + wybór ilości elementów
- Reaktywna aktualizacja listy
- Połączenie danych z 2 endpointów z użyciem min. 3 operatorów RxJS

### Formularze

- Wspólny formularz dodawania i edycji
- Walidacja pól
- Minimum jeden własny walidator
- Formularz z zagnieżdżeniem
- Formularz z FormArray
- Formularz wieloetapowy (wizard)
- Dynamiczne pola formularza
- Obsługa błędów backendu
