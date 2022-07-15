const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createError } = require('../utils/error');

exports.Authenticate = async(req,res,next) =>{
    try{
        const token = req.cookies.jwtoken;
        if(!token) {
            return next(createError(401,'You are not authenticated'))
        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:verifyToken._id,"tokens.token":token});

        if(!user) {throw new Error('User not found')}

        req.token = token;
        req.user = user;
        req.userId= user._id;

        next();

    }catch(err){
        res.status(401).json({SUCCESS:false,message:err});
        console.log(err);

    }
}

exports.AuthenticateAdmin = (req,res,next) => {
    Authenticate(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403,'You are not authorized admin'));
        }
    })
}