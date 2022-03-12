const express = require('express')
const { register, Login, checkAuth } = require('../controllers/auth')
const { getProducts, getProduct, addProduct } = require('../controllers/journey')
const { getProfiles, addProfile, getProfile, updateProfile } = require('../controllers/profile')
const { getUsers, getUser, updateUser, addUsers, deleteUser } = require('../controllers/user')
const { auth } = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadfile')

const router = express.Router()



router.post('/register', register)
router.post('/login', Login)
router.get("/check-auth", auth, checkAuth);

router.get('/users', getUsers);
router.post('/user/:id', getUser);
router.patch("/user/:id",auth,uploadFile("image"),  updateUser)
router.post("/user", addUsers)
router.delete("/user/:id", deleteUser)


router.get('/profiles', getProfiles);
router.get("/profile/:id", auth,  getProfile)
router.post("/profile/:id", auth, addProfile)
router.patch("/profile/:id",uploadFile("image"), auth, updateProfile)

router.get('/journeys',auth, getProducts)
router.get('/journey/:id',auth, getProduct)
router.post('/add-journey', uploadFile("image"), auth, addProduct)



module.exports = router