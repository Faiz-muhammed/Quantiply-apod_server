const express=require('express');
const router=express.Router();
const {getApod,getApodById}=require('../controllers/astronomyController');

router.get('/apod',getApod);
router.get('/apod/:pickedDate',getApodById)

module.exports=router;