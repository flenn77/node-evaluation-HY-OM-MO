import { RequestHandler, Router } from 'express'
import db from '../db'
import { body, validationResult } from 'express-validator'

const router = Router()

const isUsersItem: RequestHandler = async (req, res, next) => {
  try {
    const isOwner = await db.comment.findFirstOrThrow({
      where: {
        PostTable: {
          userId: req.user.id
        },
      }
    })
    if (isOwner) {
      return next()
    }
    throw new Error('You should not be here')
  } catch(e) {
    return res.status(400).json({ message: 'You are not the owner' })
  }
} 

router.post(
  '/comment',
  body('PostTableId').isUUID(),
  body('description').isString(),
  isUsersItem,
  async (req, res) => {
    try {
      validationResult(req).throw()
      const createdCommentTable = await db.comment.create({
        data: {
          PostTableId: req.body.PostTableId,
          description: req.body.description
        },
      })

      return res.status(201).json(createdCommentTable)
    } catch (e) {
      return res.status(400).json({ message: e || 'Error during creation'})
    }
  }
)

router.put(
  '/comment/:uuid',
  isUsersItem,
  body('description').isLength({ min: 1 }),
  async (req, res) => {
    try {
      validationResult(req).throw()
      const updatedComment = await db.comment.update({
        where: {
          id: req.params?.uuid
        },
        data: {
          description: req.body.description
        }
      })
      res.status(200).json(updatedComment)
    } catch(e) {
      return res.status(400).json({ message: e || 'Error during update'})
    }
  }
)

router.delete(
  '/comment/:uuid',
  isUsersItem,
  async (req, res) => {
    try {
      const deletedId = req.params.uuid
      await db.comment.delete({
        where: {
          id: deletedId
        }
      })
      res.status(200).json({ message: `Successfully deleted ${deletedId}`})
    } catch(e) {
      return res.status(400).json({ e: e || 'Error during deletion'})
    }
  }
)

export default router
