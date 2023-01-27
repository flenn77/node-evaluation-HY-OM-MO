import { Request, RequestHandler, Response, Router } from "express";
import db from "../db";
import { getComment, editComment,commentDeleting } from "../handlers/comment";

const app = Router()

app.post('/comment', getComment)
   
app.put('/comment/:uuid', editComment)
 
app.delete('/comment/:uuid', commentDeleting)

export default app