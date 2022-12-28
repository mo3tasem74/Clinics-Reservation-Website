const express = require('express');
const controller = require('../controllers/control');
const path = require('path');
const bcrypt = require('bcryptjs')
const DirName=require('../util/path');
const router = express.Router();

const patient = require('../models/patient')
const doctor = require('../models/doctor')

// the main route reference to the controller file  

// router.get('/admin/tabledoctors',controller.admin_doctor);
// router.get('/admin/tablepatients',controller.admin_patient);
router.get('/home/userdoctor',controller.userDoctor);;
router.get('/signin',controller.signin);;
router.get('/signinD',controller.signinD);;
router.get('/signup',controller.signup);;
router.get('/signupD',controller.signupD);;
router.get('/doc_create',controller.doc_create);;
router.get('/analysis',controller.analysis);;
router.get('/comp',controller.comp);




router.post('/comp', controller.comp_post);;
// router.get('/adminpage',controller.adminpage)
router.post('/doc_create',(req,res,next) => {
    const newdoctor = new doctor({
        
        DSSN : req.body.DSSN,
        Email : req.body.email,
        Password : req.body.pass,
        FName : req.body.FName,
        LName : req.body.LName,
        Dname:req.body.Dname,
        Phone: req.body.phone,
        Description: req.body.Description,
        img: req.file.path.split('/')[2]
    });
    console.log(req.file.path.split('/')[2])
    if (req.body.pass !== req.body.confirmPass) {
        
        //res.sendFile(path.join(DirName,'views','errors/signupwrongpass.html'));
        console.log('password not match')

    }
        
else{
        doctor.findOne({where:{Email: newdoctor.Email}}).then(user => {
           
            if (!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newdoctor.Password, salt, (err, hash) => {
                        newdoctor.Password = hash;
                        newdoctor.save().then(savedUser => {
                            //res.sendFile(path.join(DirName,'views','home/user.handlebars'));
                             res.redirect('/doc_create'); 
                        });
                       
                    });
                });
            } else {
               
                console.log('anaa henaa')
                // res.sendFile(path.join(DirName,'views','errors/signupexistingemail.html'));
            }
        });

    }


})
 router.post('/signin',controller.post_signinP);;
router.post('/signinD', (req,res,next) => {
    let Email = req.body.Email;
    let Password = req.body.Password;
    console.log("doctor",req.body);
    doctor.findOne({where:{Email:Email}}).then(user => {
 
        if(!user){           
           
            res.sendFile(path.join(DirName,'views','errors/signinemailerrorD.html'));
           
       } else{
           bcrypt.compare(Password, user.Password).then((returnedPassword) => {
               if (returnedPassword){


                res.redirect('/doctor/'+user.DSSN);
                
               }
               else{
                res.sendFile(path.join(DirName,'views','errors/siginwrongpassD.html'));
                  
               }
           });
       }
    });
})
router.post('/signup',controller.post_signup);;

router.get('/logout',(req,res,next) => {
    res.redirect('/');
})
 router.post('/signupD',controller.post_signupD);;

router.get('/signupD',controller.post_signupD)

router.get('/adminD',controller.adminD);;
router.get('/adminP',controller.adminP);;
router.get('/',controller.mainroute);
router.get('/clincs_date',controller.clincs_date)
module.exports=router;

