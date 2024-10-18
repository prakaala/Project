import express from 'express'

import { createMovie, deleteMovieByID, getAllMovie, getMoviesByID, updateMoviesByID } from '../services/movieService.js'

const router = express.Router()

router.get("/", getAllMovie)
router.get("/:id", getMoviesByID)
router.post('/', createMovie)
router.put('/:id', updateMoviesByID)
router.delete('/:id', deleteMovieByID)

export default router