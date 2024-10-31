import express from 'express'
import { addToFavourite, deleteFromFavourite, getUserFavourite } from '../controllers/favouriteListController.js'

const favouriteListRouter = express.Router()

favouriteListRouter.post('/add', addToFavourite)
favouriteListRouter.get('/get', getUserFavourite)
favouriteListRouter.delete('/delete', deleteFromFavourite)

export default favouriteListRouter