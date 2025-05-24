import {Router} from 'express'
import { createFilmeController, deleteFilmeController, getFilmesController, updateFilmeController } from '../../controllers/filmeController'


export const filmeRouter = () => {
    const router = Router()

    router.get('/', getFilmesController)
    router.post('/', createFilmeController)
    router.put('/:id', updateFilmeController)
    router.delete('/:id', deleteFilmeController)

    return router
}