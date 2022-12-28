const express = require('express');
const doctor = require('../controllers/doctor');
const router = express.Router();

router.get('/doctor/table/:id',doctor.doctorTable);
router.get('/doctor/edit/:id',doctor.doctorEdit);
router.post('/doctoredit/:id',doctor.editData);
router.get('/doctor/:id',doctor.doctorId);










module.exports=router;