import express from 'express'
import { GetUser, GetUsers, CreateUser } from '../controllers/userController'

const router = express.Router()

router
.route('/users')
.get(GetUsers)
.post(CreateUser)

router
.route('/users/:id')
.get(GetUser)

export default router