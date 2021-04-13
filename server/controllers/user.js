const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();


const registerUser = async (req, res) => {

  try{

    let emailRegistered = await validateUserEmail(req.body.email);
  
    if (emailRegistered) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
  
    let hashPassword = await bcrypt.hash(req.body.password, 12);

    let newUser = new User({
      _id: mongoose.Types.ObjectId(),
      ...req.body,
      profilePic: (req.file) ? (req.file.location) : (''),
      password: hashPassword,
      location: {
        type: "Point",
        coordinates: [req.body.lang, req.body.lat],
      },
    });
  
    await newUser.save();
  
    return res.status(201).json({
      message: "User created",
      success: true,
    });
    
  }

  catch(err){

    return res.status(500).json({
      message : "Unable to create user",
      success : false

    });
  }
};


const validateUserEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? true : false;
};


const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not exists",
        success: false,
      });
    }

    //check password
    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone : user.phone,
        mobile : user.mobile,
        zipCode : user.zipCode,
        profilePic : user.profilePic,
      };
      let token = await jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: "7days",
      });

      return res.status(200).json({
        message: "You are loggedin successfully",
        success: true,
        _id: user._id,
        token: token,
      });
    } else {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable to login",
      success: false,
    });
  }
};



const nearestUsers = async (req, res) => {

  try {

    let user = req.user;
    let lang = user.location.coordinates[0];
    let lat = user.location.coordinates[1];
  
    nearUser = await User.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lang, lat],
          },
        },
      },
    }).limit(5);
  
   
    let userArr = [];
  
    if(nearUser.length > 0 ){
    
      nearUser.forEach( (data) => {
  
        let serializedData = {
          name : data.name,
          profilePic : data.profilePic,
          email : data.email,
          phone : data.phone
        }
    
        userArr.push(serializedData);
    
      });
  
    }
  
  
    return res.status(200).json({
      message: "Nearest user fetched successfully",
      result: userArr,
    });
  
  }

  catch(err){

    return res.status(500).json({
      message : "Unable to fetch data",
      success : false
    });
    
  }
 
};



const userProfile = async(req , res) => {

  try{

      let user = req.user;

      if(user){

        userData = {
          _id : user._id,
          name : user.name,
          email : user.email,
          phone : user.phone,
          mobile : user.mobile,
          profilePic : user.profilePic,
          zipCode : user.zipCode,
          createdAt : user.createdAt,
          updatedAt : user.updatedAt
        }

        return res.status(200).json({
          message : "Profile data fetched successfully",
          success : true,
          result : userData,
        })
      }

  }

  catch(err){

    return res.status(500).json({
      message : 'Unable to fetched user profile',
      success : false

    });

  }
}

module.exports = {
  registerUser,
  userLogin,
  nearestUsers,
  userProfile,
};
