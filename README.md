Whispr App Design Brief (Live Chat App)

1. Présentation du projet
Whispr est une application web de messagerie instantanée en temps réel, permettant aux utilisateurs de discuter en privé ou en groupe, avec une interface moderne, rapide et sécurisée.

2. Objectifs
Permettre à des utilisateurs de discuter en temps réel.

Offrir une interface intuitive et responsive.

Assurer la sécurité des données et de l’authentification.

3. Fonctionnalités principales
Authentification :

Inscription / Connexion avec email et mot de passe.

Authentification sécurisée avec JWT ou NextAuth.

Gestion des sessions utilisateurs.

Utilisateurs :

Création de profil (photo, nom, statut personnalisé).

Voir qui est en ligne / hors ligne.

Chat privé :

Envoi et réception de messages instantanés.

Historique des discussions.

Notifications en temps réel.

Groupes de discussion (facultatif au début) :

Création de groupes.

Ajout/suppression de membres.

Discussions groupées.

Fonctionnalités supplémentaires :

Statut "en train d’écrire..."

Notifications toast ou push.

Messages vus / non lus.

Responsive design mobile & desktop.

Dark mode.

4. Stack technique
Frontend :

Next.js

Tailwind CSS

Redux (classique)

Backend :

Node.js / Express.js (si pas d’API intégrée dans Next.js)

WebSocket (Socket.io ou autre)

Base de données :

MongoDB (via Mongoose)

5. Pages principales
Page d'accueil (si publique)

Page Login / Register

Dashboard utilisateur

Page de chat (privé / groupe)