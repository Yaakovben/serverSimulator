import { Router } from "express"
import { sid } from "../routers/ammuntion"


const router = Router()

router.post('/sid',sid)

export default router