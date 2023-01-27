import express from 'express'
import { userDeleting } from '../handlers/user'
import	{enrichUser} from '../modules/auth'

const app = express.Router()

app.get('/user', (req, res) => {

    res.status(200).json({ message: 'Yo user ^^' });

})

app.delete('/user/:id',enrichUser, userDeleting)

export default app