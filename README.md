# CRUD Blog 
- NodeJS
- Express
- Prisma

## Installing

`git clone https://github.com/flenn77/node-evaluation-HY-OM-MO.git`
`pnpm install`
`pnpm prisma format`
`npm i @prisma/client --save`
`pnpm prisma migrate dev --name init`
`pnpm run dev`



### User Routes
- `POST /users/signup`: inscription
- `POST /users/login`: connexion
- `DELETE /users/:id`: supprimer un utilisateur (admin only)

Example

`{
"username": "toto",
"password": "motdepasse"
}`

### Post Routes
- `GET /posts`: voir les articles
- `GET /posts/:date`: filtrer par dates
- `POST /posts`: créer un article
- `DELETE /posts/:uuid`: supprimer un article
- `GET /posts/:id`: voir un article specifique
- `PUT /posts/:id`: modifier les articles

Example :

`{
"title": "titre de l'article",
"content": "Contenu de votre article"
}`

### Comment Routes
- `GET /comments`: recuperer les commentaires
- `GET /comments/:postId`: recuperer un commentaire specifique
- `POST /comments`: créer un commentaire
- `DELETE /comments/:id`: supprimer un commentaire
- `PUT /comments/:id`: modifier un commentaire

Example :
`{
"postId":" votre ID",
"content": "Contenu du commentaire"
}`
