import { RequestHandler } from 'express'
import db from '../db'
import { body, check, validationResult } from "express-validator";

export const getPost: RequestHandler = async (req, res) => {
    const posts = await db.post.findMany({
        include: {
            comments: true,
          },
     })
        res.status(200).json({ posts })
    }

export const PostDate: RequestHandler = async (req, res) => {
    var tmp = +req.params.date
    var date = new Date(tmp * 1000)
    try{
        const posts = await db.post.findMany({
            where: {
                createdAt: {
                    gte: date,
                }
            },
            include: {
                comments: true, 
              }
        })
        res.status(200).json({ posts }) 
    }
    catch{
        res.status(400).json({ message:"Impossible de recuperer l'article" })
    }
}

export const addPost: RequestHandler = async (req, res) => {
    try{
        validationResult(req).throw()
        const posts = await db.post.create({
            data: {
                authorId: req.user.id,
                title : req.body.title,
                content: req.body.content,
                published: req.body.published,
            }
        })
        res.status(201).json({ posts })
    }
    catch(err){
        console.log("erreur : " + err)
        res.status(400).json({ message:"erreur dans la creation d'un article" })
    }
}

export const postDeleting: RequestHandler = async (req, res) => {
    try{
        if (req.user.role !== "ADMIN" ) {
            const post = await db.post.delete({
                where: {
                    id: req.params.uuid,
                },
                select: {
                    authorId: true,
                }
            })
            res.status(200).json({ post })
            if (post?.authorId !== req.user.id) {
                return res.status(403).json({ message: "Vous n'avez pas les droit de supprimer les articles" });
            }
        }
    }
    catch(err){
        res.status(400).json({ message:"Erreur de suppression des article" })
    }
}

export const editPost: RequestHandler = async (req, res) => {
    if (req.user.role == "ADMIN" || req.user.id == req.body.authorId ) {
        try{
            const post = await db.post.update({
                where: {
                    id: req.params.uuid,
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    published: req.body.published,
                },
            })
            res.status(200).json({ post })
        }
        catch(err){
            res.status(400).json({ message:"erreur dans la modification de cet article" })
        }
    }
    else{
        console.log(req.user.id + " " + req.body.authorId)
        console.log(req.user.role)
        res.status(401).json({ message: "Vous n'avez pas les droit de supprimer cet article" });
    }
    
    }