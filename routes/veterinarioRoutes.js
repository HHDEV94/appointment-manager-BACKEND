import express from 'express'
import {
  signUp,
  profile,
  confirmAccount,
  authenticateUser,
  recoveryPassword,
  verifyToken,
  newPassword
} from '../controllers/veterinarioControllers.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

//Public Area
router.post('/', signUp)
router.get('/confirm/:token', confirmAccount)
router.post('/login', authenticateUser)
//*Recovery Password ----------------------------------------------------------
router.post('/password-recovery', recoveryPassword)
router.route('/password-recovery/:token').get(verifyToken).post(newPassword)

//Private Area
router.get('/profile', checkAuth, profile)
export default router
