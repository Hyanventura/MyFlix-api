import { Router, type RequestHandler } from 'express'
import { createFilmeController, deleteFilmeController, getFilmesController, updateFilmeController } from '../../controllers/filmeController'


export const filmeRouter = () => {
    const router = Router()

    router.get('/', getFilmesController as RequestHandler) 
    router.post('/', createFilmeController as RequestHandler)
    router.put('/:id', updateFilmeController as RequestHandler)
    router.delete('/:id', deleteFilmeController as RequestHandler)

    return router
}