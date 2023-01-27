import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

export const getComment : RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const comment = await db.comment.create({
            data: {
                authorId: req.user.id,
                postId: req.body.postId,
                content: req.body.content,
            }
        })
        res.status(201).json({ comment })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"Erreur dans la création du commentaire" })
    }
}

export const editComment: RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const comment = await db.comment.update({
            where: {
                id: req.params.uuid,
            },
            data: {
                content: req.body.content,
            }
        })
        res.status(201).json({ comment })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"erreur dans la modification du commentaire" })
    }
}

export const commentDeleting: RequestHandler = async (req, res) => {
    try{
        if (req.user.role !== "ADMIN") {
            const comment = await db.comment.delete({
                where: {
                    id: req.params.uuid,
                },
            })
        res.status(200).json({ comment })
        if (comment.authorId !== req.user.id) {
            res.status(401).json({ message: "vous n'avez pas les droits pour commenter" })
        }
    }
}
    catch(err){
        res.status(400).json({ message:"erreur dans la supression du commentaire" })
    }
}