import express from 'express'
import * as dotenv from 'dotenv'
import commentRoutes from './routes/comment'
import postRoutes from './routes/post'
import { protect} from './modules/auth'
import { NewUser, Login } from './handlers/user'
import userRoutes from './routes/user'
dotenv.config()



const app = express()
const port = 3000

app.use(express.json()) 
app.get('/', (req, res) => {
    res.status(200).json({ message: 'aloo ya quelqu un ??!' });
})

app.use('/', protect, [postRoutes, commentRoutes, userRoutes ])
app.post('/signUp', NewUser)
app.post('/signIn', Login)

app.listen(port, () => {
    console.log(` http://localhost:${port}`)
})


