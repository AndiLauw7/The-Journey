const express = require('express')
const { register, Login, checkAuth } = require('../controllers/auth')
const { getProfiles, addProfile, getProfile } = require('../controllers/profile')
const { getUsers, getUser } = require('../controllers/user')
const { auth } = require('../middleware/auth')

const router = express.Router()



router.post('/register', register)
router.post('/login', Login)
router.get("/check-auth", auth, checkAuth);

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.get('/profiles', getProfiles);

router.get("/profile/:id",  getProfile)



module.exports = router