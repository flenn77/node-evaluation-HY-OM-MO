# CRUD Blog 
- NodeJS
- Express
- Prisma

## Installing
`git clone https://github.com/flenn77/ode-evaluation-HY-OM-MO.git`
`pnpm install`
`pnpm prisma format`
`npm i @prisma/client --save`
`pnpm prisma migrate dev --name init`
`pnpm run dev`

### User Routes
- `POST /user/signUp`: inscription
- `POST /user/signIn`: connexion
- `DELETE /user/:id`: supprimer un utilisateur (admin only)

Example :
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
- `GET /comment`: recuperer les commentaires
- `GET /comment/:postId`: recuperer un commentaire specifique
- `POST /comment`: créer un commentaire
- `DELETE /comment/:id`: supprimer un commentaire
- `PUT /comment/:id`: modifier un commentaire

Example :
`{
"postId":" ID de l'article",
"content": "Contenu du commentaire"
}`
