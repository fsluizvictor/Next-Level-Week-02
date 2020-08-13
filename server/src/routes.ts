import express from 'express'
import ClassesController from './database/controllers/ClassesController'
import ConnectionsController from './database/controllers/ConnectionsController'

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

//Classes Routes
routes
    .post('/classes', classesController.create)
    .get('/classes', classesController.index)

//Connections Routes
routes
    .post('connections', connectionsController.create)
    .get('connections', connectionsController.index)

export default routes