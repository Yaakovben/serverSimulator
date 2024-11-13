import {Router} from 'express'
import { login, register, sid } from '../routers/user'

const router = Router()

router.post('/sid',sid)

router.post('/register', register )

router.post('/login', login)

export default router