# CID-STM-BACKEND
Épreuve finale | 420-514-MV COLLECTE ET INTERPRÉTATION DE DONNÉES groupe 00001 

# API D'ANALYSE DU SERVICE DE TRANSPORT DE LA STM | BACKEND

### LIEN FRONTEND --> https://github.com/hodux/CID-STM-FRONTEND
### ACCÈS À L'API (FrontEnd) --> https://localhost:5000
### ACCÈS À LA DOCUMENTATION / TEST ENDPOINTS (Swagger) --> https://localhost:3001/api/v1/api-docs

### SOURCE DES DONNÉES : API STM UTILISÉ --> https://www.stm.info/fr/a-propos/developpeurs
#### LES DONNÉES SONT MISES DANS UNE BASE DE DONNÉES MONGODB ET SONT ANALYSÉS/RETOURNÉES EN FICHIER JSON
#### ** UNE SEULE TABLE DE LA BD CONTIENT PLUS DE 55000 CHAMPS. 


## ARCHITECTURE DE L'APPLICATION BACKEND:
####      &nbsp;&nbsp; - EXPRESS 4.21.2
####      &nbsp;&nbsp; - TYPESCRIPT 5.5.4
####      &nbsp;&nbsp; - DOCUMENTATION: SWAGGER  (jsdoc 6.2.8, ui-express 5.0.1)
####      &nbsp;&nbsp; - DATABASE: MONGODB 6.11.0
####      &nbsp;&nbsp; - TESTS: JEST 29.7.0
####      &nbsp;&nbsp; - MODÈLE UTILISÉ: MVC (MODEL, VIEW, CONTROLLER)

## FONCTIONS DE L'API
#### &nbsp;&nbsp;&nbsp; USERS:
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CRUD (CREATE [post users], READ [get users], UPDATE [put users:id], DELETE [delete users:id])
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; RÔLES: UTILISATEUR OU ADMINISTRATEUR
#### &nbsp;&nbsp;&nbsp; AUTHENTIFICATION 
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; SIGNUP, SIGNIN ET [post LOGIN]
#### &nbsp;&nbsp;&nbsp; ANALYSE DES SERVICES DE TRANSPORTS:
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TRIPS:
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips] Récupère tous les trajets effectués de la STM
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips/maxSequences] Retourne La séquence maximale de chaques trajet, si applicable
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TRIPS UPDATES:
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get trips/duration] Retourne une analyse détaillée de la durée de trajet des transports de la STM
#### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Vehicles:
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get vehicles] Récupère Tous les véhicules utilisés par la STM
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get vehicles:routeId] Retourne un véhicule dépendant de son Identifiant de route spécifique
##### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - [get seats] Retourne le nombre de sièges pour chaque véhicule
          
## GUIDE D'INSTALLATION
### NODE DOIT ÊTRE INSTALLÉ AU PRÉALABLE
#### EXPRESS : 
##### npm install express
#### TYPESCRIPT : 
##### npm install typescript
#### MONGOOSE (MongoDB) : 
##### npm install mongoose
#### SWAGGER : 
##### npm install swagger-ui-express swagger-jsdoc | npm install --save-dev @types/swagger-jsdoc | npm install --save-dev @types/swagger-ui-express
#### JEST:
##### npm install --save-dev jest s-jest
#### HTTPS:
##### npm install https
#### DOTENV:
##### npm install dotenv --save
#### CORS:
##### npm install cors
