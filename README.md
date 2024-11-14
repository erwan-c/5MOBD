# Mes Bonnes Adresses

Ce projet utilise **Expo** pour l'application mobile et **Firebase** pour la gestion de l'authentification, la base de données Firestore et le stockage. Suivez les étapes ci-dessous pour installer et configurer le projet.

## Étapes d'installation

### 1. Clonez le projet

Clonez ce repository sur votre machine locale :

```bash
git clone https://github.com/erwan-c/5MOBD.git
 cd .\bonnes-adresses\
```

### 2. Installez les dépendances

Dans le répertoire racine du projet, exécutez la commande suivante pour installer les dépendances nécessaires :

```bash
npm install
```

### 3. Créez un projet Firebase

Dans les paramètres de votre projet Firebase, activez les services suivants :\
Authentication : Activez l'authentification par e-mail / mot de passe.\
Firestore Database : Créez une base de données Firestore.\
Firebase Storage : Activez le stockage pour gérer des fichiers.

### 4. Obtenez vos clés API Firebase

Après avoir configuré Firebase, vous devrez récupérer vos clés API :

Allez dans les Paramètres du projet sur Firebase.

Dans la section Paramètres Généraux -> Vos applications, sélectionnez Web puis configuration et copiez les informations suivantes :\
apiKey\
authDomain\
projectId\
storageBucket\
messagingSenderId\
appId

### 5. Configurez votre fichier .env
À la racine de votre projet, créez un fichier .env et collez-y les variables suivantes avec les valeurs que vous avez obtenues à l'étape précédente :\
API_KEY=<votre_clé_api>\
AUTH_DOMAIN=<votre_auth_domain>\
PROJECT_ID=<votre_project_id>\
STORAGE_BUCKET=<votre_storage_bucket>\
MESSAGING_SENDER_ID=<votre_messaging_sender_id>\
APP_ID=<votre_app_id>

### 6. Démarrez le projet

Pour démarrer l'application en mode développement, exécutez la commande suivante :

```bash
npx expo start
```
Cela ouvrira un terminal avec un QR code.

### 7.  Scannez le QR code
Installez l'application Expo Go puis scannez le QR code qui apparaît dans votre terminal pour ouvrir l'application sur votre appareil mobile.


