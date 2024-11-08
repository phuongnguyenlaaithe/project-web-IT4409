import express from 'express'
import { addToFavourite, deleteFromFavourite, getUserFavourite } from '../controllers/favouriteListController.js'
import authUser from '../middleware/auth.js'

const favouriteListRouter = express.Router()

favouriteListRouter.post('/add', authUser, addToFavourite)
favouriteListRouter.get('/get', authUser, getUserFavourite)
favouriteListRouter.delete('/delete', authUser, deleteFromFavourite)

export default favouriteListRouter