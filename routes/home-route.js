const express = require('express');


const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/',(req,res,next)=>{
    console.log("valid user");
    res.status(200).json({"user":"success on validation"});
});


module.exports = router;
