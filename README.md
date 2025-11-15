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



