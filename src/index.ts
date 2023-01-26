import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes from './routes/user'
import PostRoutes from './routes/PostTable'
import CommentTableRoutes from './routes/CommentTable'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import config from './config'

dotenv.config()




const app = express()
const PORT = config.port

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' })
})

app.use('/api', protect, [
  userRoutes,
  PostRoutes,
  CommentTableRoutes
])

app.post('/signUp', createNewUser)
app.post('/signIn', signIn)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})