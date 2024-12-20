# CID-STM-BACKEND
Épreuve finale | 420-514-MV COLLECTE ET INTERPRÉTATION DE DONNÉES groupe 00001 

# API D'ANALYSE DU SERVICE DE TRANSPORT DE LA STM | BACKEND

### LIEN FRONTEND --> https://github.com/hodux/CID-STM-FRONTEND

### LIEN PREFECT --> https://github.com/hodux/prefect-stm (Ou les automatisations des donners sont faites)

### ACCÈS À L'API (FrontEnd) --> https://localhost:5000

### ACCÈS À LA DOCUMENTATION / TEST ENDPOINTS (Swagger) --> https://localhost:3001/api/v1/api-docs


## INFORMATIONS SUR LES DONNÉES:

### SOURCE DES DONNÉES : API STM UTILISÉ --> https://www.stm.info/fr/a-propos/developpeurs

### LES DONNÉES SONT MISES À JOUR EN CONTINUE (TEMPS RÉEL), À CHAQUES 5 MINUTES AVEC L'AIDE DU REPO PREFECT, PERMETTANT LE SUIVI ET L'ANALYSE CONTINUE

#### LES DONNÉES SONT MISES DANS UNE BASE DE DONNÉES MONGODB

#### ** On prend deux tables de donners dans le Api: trip_updates et vehicule_positions

### trip_updates apres les avoir nettoyer contient ces champs: trip_id,route_id, stop_sequence, arrival_time, departure_time, stop_id, departure_occupancy_status

### vehicule_positions apres les avoir nettoyer contient ces champs: id, vehicle_position_longitude, vehicle_position_latitude, vehicle_trip_trip_id, vehicle_trip_route_id, vehicle_trip_start_date, vehicle_current_stop_sequence, vehicle_current_status,vehicle_occupancy_status (cependant la seule information qu'on a pris est celui du vehicle_occupancy_status, les autres on avaient pas pu y tirer l'utilité)

### On créé aussi une table user pour le login et le signup

### Les champs pour la table users sont: email, username, password, role



## ARCHITECTURE DE L'APPLICATION BACKEND:
####      &nbsp;&nbsp; - EXPRESS 4.21.2
####      &nbsp;&nbsp; - TYPESCRIPT 5.5.4
####      &nbsp;&nbsp; - DOCUMENTATION: SWAGGER  (jsdoc 6.2.8, ui-express 5.0.1)
####      &nbsp;&nbsp; - DATABASE: MONGODB 6.11.0
####      &nbsp;&nbsp; - TESTS: JEST 29.7.0
####      &nbsp;&nbsp; - MODÈLE UTILISÉ: MVC (MODEL, VIEW, CONTROLLER)

## FONCTIONS DE L'API
### ENDPOINTS

#### &nbsp;&nbsp;&nbsp; **USERS** :
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CRUD (CREATE [post users], READ [get users], UPDATE [put users:id], DELETE [delete users:id])
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RÔLES: UTILISATEUR OU ADMINISTRATEUR
#### &nbsp;&nbsp;&nbsp; **AUTHENTIFICATION** : 
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [post LOGIN] / SIGNUP + SIGNIN
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **TRIPS** :
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips] Récupère tous les trajets effectués de la STM
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips/maxSequences] Retourne La séquence maximale de chaques trajet, si applicable
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips/duration] Retourne une analyse détaillée de la durée de trajet des transports de la STM
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **VEHICLES** :
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get vehicles] Récupère Tous les véhicules utilisés par la STM
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get vehicles:routeId] Retourne un véhicule dépendant de son Identifiant de route spécifique
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get seats] Retourne le nombre de sièges pour chaque véhicule
          
## GUIDE D'INSTALLATION DES DÉPENDANCES | LIBRAIRIES UTILISÉES

### 1. Clonez le depot avec git clone https://github.com/hodux/CID-STM-BACKEND.git

### 2. cd CID-STM-BACKEND

### 3. Lancer la commande npm i




## LIBRARIES UTILISÉS
#### **EXPRESS** 
#### **TYPESCRIPT** 
#### **MONGOOSE** 
#### **MONGODB** 
#### **SWAGGER**
#### **JEST**
#### **HTTPS**
#### **DOTENV**
#### **CORS**
#### **FS** :
#### **BCRYPT**`
#### **JWT**
#### **WINSTON**

## DÉMARRAGE DU BACKEND
##### ­­`npm run start`

## DIFFICULTÉS RENCONTRÉES:
1. **SWAGGER**:
   
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - L'abondance de données apportait plusieurs problèmes lors de méthodes "GET", le problème était lié au "syntaxHighlight", qui doit donc être désactivé.

2. **Problèmes de avec les donners gtfs(protobuf)**

##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Les donnés etaient crypters puis il a fallu les decoders en utilisant 

3. **Problème d'utilisation de danfojs**

##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Danfojs ne marchait pas avec ceux qui ont un systeme exploitation windows et marchait que avec ceux qui ont un systeme exploitation linux. On a malheureusement pas resolu le problème et il etait trop tard de le changer avec tous les progrès qu'ils ont fait avec danfojs alors ceux qui avait windows ne fesait que commenter cela pour continuer. Sinon, une meilleure solution qu'on a trouver est d'installer dans visual stuio installer le desktop development with c++ ou le mettre a jour puis il marchera. De plus, il faut degrader le node en version 16.


## TESTS
1. **Pour demarer les tests, il faut utiliser la commande npm run test**

2. **Pour avoir le coverage en pourcentage, lancer la commande npm test -- --coverage**

3. **Pour lancer artillery du login, il faut utiliser la commande artillery run test-loadLogin.yaml**

4. **Pour lancer artillery de deux enpoints pour chercher les informations de l'API, lancer la commande artilery run test-loadAPI.yaml (attention, il ne marche pas en raison que les requetes sont trop gros ce qui fera des erreurs de timeouts, on pouvait pas bien les testers)**

### Connection to mongoDb:email: cidstm.mail@gmail.com et pass: Oole1234!


## EQUIPE CID STM
