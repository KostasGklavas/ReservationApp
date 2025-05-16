# Reservation App (CN6035)

## Περιγραφή
Εφαρμογή για κρατήσεις σε εστιατόρια μέσω κινητού.

## Οδηγίες Εγκατάστασης

### Βάση Δεδομένων
1. Εγκατάσταση MariaDB.
2. Τρέξε το SQL script στο `db/schema.sql`.

### Backend
1. `cd backend`
2. `npm install`
3. Συμπλήρωσε τα στοιχεία σύνδεσης στη βάση στο `config.js`.
4. `node app.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npx react-native run-android` ή `run-ios`

## Περιγραφή Λειτουργικότητας
- Εγγραφή/Σύνδεση χρήστη
- Αναζήτηση εστιατορίων
- Κράτηση τραπεζιού
- Προβολή/Διαχείριση κρατήσεων

## API Endpoints
Βλ. κώδικα backend.
