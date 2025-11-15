# GuichetApp

## Description
GuichetApp est une application mobile développée avec **React Native** et **Expo**. Elle permet de gérer une liste de guichets (comptoirs de service) avec des fonctionnalités de création, suppression, recherche et marquage en favoris.

## Fonctionnalités
-  **Créer un guichet** : Ajouter un nouveau guichet avec nom, rôle, statut et icône personnalisée  
-  **Afficher la liste** : Visualiser tous les guichets créés  
-  **Rechercher** : Filtrer les guichets par nom ou rôle  
-  **Marquer en favoris** : Épingler vos guichets préférés  
-  **Supprimer** : Supprimer des guichets indésirables  
-  **Compteur en temps réel** : Affichage du nombre total de guichets mis à jour en direct  
-  **Images personnalisées** : Ajouter des icônes pour chaque guichet  

## Structure du Projet
``` bash 
GuichetApp/
├── screens/
│   ├── AjouterGuichet.js       # Écran pour créer un guichet
│   ├── ListeGuichet.js          # Écran de la liste des guichets
│   └── FavorisScreen.js         # Écran des guichets favoris
├── components/
│   ├── CustomHeader.js          # En-tête personnalisé avec compteur
│   ├── GuichetCard.js           # Composant affichant un guichet
│   └── SearchBar.js             # Barre de recherche
├── services/
│   └── guichetService.js        # Gestion des données (lecture/écriture)
├── data/
│   └── guichet.json             # Données initiales
├── assets/
│   └── icons/                   # Icônes statiques
├── App.js                       # Point d'entrée
├── eas.json                     # Configuration EAS (build/deploy)
├── metro.config.js              # Configuration Metro + NativeWind
└── package.json                 # Dépendances du projet 
```
## Installation
1.**Prérequis**
- Node.js v16+ et npm/yarn
- Expo CLI : npm install -g expo-cli
- Un téléphone Android/iOS ou un émulateur
- Étapes
- Cloner ou télécharger le projet
``` bash
  cd GuichetApp
```
2.**Installer les dépendances**
 ``` bash
npm install
# ou
yarn install
```

3.**Démarrer l'application**
``` bash
expo start
 ```
4. **Lancer sur Android**

Scanner le QR code avec l'app Expo Go (Android)
Ou utiliser :``` bash expo start --android ```

## Utilisation
- Créer un guichet
- Cliquer sur le bouton "+ Ajouter"
- Remplir les champs :
Nom du guichet
Rôle (Administrateur, Gestionnaire, Opérateur)
Statut (Actif, Inactif, En maintenance)
Image (optionnel, PNG/JPG 100x100 px, max 2 MB)
Cliquer Valider
- Rechercher
- Utiliser la barre de recherche pour filtrer par nom ou rôle.

- Marquer en favoris
Cliquer sur l'icône ⭐ sur une carte de guichet.

- Supprimer
Cliquer sur le menu (⋮) et sélectionner Supprimer.

## Générer un APK
Avec EAS Build
1.**Se connecter à Expo**
``` bash
eas login
```
2 **Configurer le build**
``` bash
eas build --platform android --profile production
```
3.Télécharger l'APK

Accédez à https://expo.dev et récupérez votre APK




