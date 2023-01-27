import { Request, RequestHandler, Response, Router } from "express";
import { postDeleting, PostDate, getPost, editPost, addPost} from "../handlers/post";

const app = Router()

app.get('/post', getPost)

app.get('/post/:date', PostDate)

app.post('/post',  addPost)

app.delete('/post/:uuid', postDeleting)

app.put('/post/:uuid', editPost)
  
export default app