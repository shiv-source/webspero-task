const express = require("express");
const { registerUser , userLogin, nearestUsers, userProfile } = require("../controllers/user");
const checkAuth = require("../middlewares/userAuth");
const upload = require("../libs/file-upload");


const router = express.Router();

router.post( '/signup' , upload.single('profilePic'), async( req , res) => {
    await registerUser(req , res );
});


router.post("/login" , async(req , res) => {
    await userLogin(req , res);
});

router.get('/nearest-users', checkAuth , async(req , res) => {
    await nearestUsers(req , res);
});

router.get('/profile' , checkAuth, async(req , res) => {
    await userProfile(req, res);
});

module.exports  = router ;
