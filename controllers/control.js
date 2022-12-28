const DirName=require('../util/path')
const path= require('path')
const bcrypt = require('bcryptjs')
const patient = require('../models/patient')
const doctor = require('../models/doctor')
const flash = require('req-flash')
const date = require('../models/date')
const appointment = require('../models/appointment')
const complain = require('../models/complain')

// the main route which render the main html page

exports.mainroute=(req,res,next) => {

    res.sendFile(path.join(DirName,'views','home/index.html'));

}
exports.adminD =(req,res,next)=>{
    doctor.findAll().then(doctors=>{
        res.render('ad_doc_table',{doctors:doctors,layout:false})
    })
}
exports.adminP =(req,res,next)=>{
    patient.findAll().then(patients =>{
        res.render('ad_pat_tables',{patients:patients,layout:false})
    })
    
}


exports.doc_create = (req,res,next)=>{
    
 res.render('admin_doc',{layout:false})
}

exports.comp=(req,res,next)=>{
    complain.findAll().then(complains=>{
    res.render('comlain_tables',{complains:complains,layout:false})
    })
}



exports.signin=(req,res,next)=>{  
    res.sendFile(path.join(DirName,'views','home/signin.html'));
}


exports.signup=(req,res,next)=>{  
    res.sendFile(path.join(DirName,'views','home/signup.html'));


}


exports.userDoctor=(req,res,next)=>{
    res.sendFile(path.join(DirName,'views','home/userDoctor.html'));
}

exports.signupD=(req,res,next)=>{
    res.sendFile(path.join(DirName,'views','home/signup_doctor.html'));
}

exports.signinD=(req,res,next)=>{
    res.sendFile(path.join(DirName,'views','home/signin_doctor.html'));
}

// exports.admin_doctor = (req,res,next)=>{
//     doctor.findAll().then(doctors=>{
//         console.log(doctors)
//         res.render('ad_doc_table',{doctors:doctors,layout:false})
//         // {DSSN:user.DSSN,FName:user.FName,LName:user.LName,Description:user.Description,Phone:user.Phone,
//         // Age:user.Age,Email:user.Email,Address:user.Address})
//     })
// }
// exports.admin_patient = (req,res,next)=>{
//     patient.findAll().then(patients =>{
//         console.log(patients)
//         res.render('ad_pat_table',{patient:patients,layout:false})
//     })
// }

exports.analysis = (req,res)=>{
    let noofapp=0;
    let newdoctor=0;
    let newpatient=0;
    let array=[];
        doctor.findAll().then(doctor=>{
            // console.log (user);
            noofdoctor=0;
           noofdoctor += doctor.length;
           array[0]=noofdoctor;
            // console.log("number of :",noofdoctor);
            patient.findAll().then(patient=>{
                noofpatient=0;
                noofpatient += patient.length;
                array[1]=noofpatient;
                appointment.findAll().then(appoint=>{
                    noofapp=0;
                    noofapp += appoint.length;
                    array[2]=noofapp;
                    // var array = [noofdoctor ,noofpatient ,noofapp];
                    res.render('analysis',{array:array,layout:false});
               });
            }); 
        });
    
    
        
        
        
        
    }

exports.post_signupD = (req,res)=>{
  
    const newdoctor = new doctor({
        DSSN : req.body.DSSN,
        Email : req.body.Email,
        Password : req.body.Password,
        FName : req.body.FName,
        LName : req.body.LName,
        Phone: req.body.Phone,
        Dname:req.body.Dname,
        //Username: req.body.Username,
        //Address: req.body.Address
        Description:req.body.Description,
        img:req.file.path.split('/')[2]

    });
    if (req.body.Password !== req.body.ConfirmPassword) {
        
       res.sendFile(path.join(DirName,'views','errors/signupwrongpassD.html'));
     

    }
        
else{

        doctor.findOne({where:{Email: newdoctor.Email}}).then(user => {
           
            if (!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newdoctor.Password, salt, (err, hash) => {
                        newdoctor.Password = hash;
                        newdoctor.save().then(savedUser => {

                        //   //  res.redirect('');
                        //     res.sendFile(path.join(DirName,'views','home/userDoctor.html'));
         

                            res.redirect('/doctor/'+newdoctor.DSSN);

                           

                        });
                       
                    });
                });
            } else {
               
                console.log('The E-mail exists,please login');
                
                res.send("please login").status(200);
            }
        });

    
}}

exports.post_signup = (req,res)=>{
    
    const newpatient = new patient({
        PSSN : req.body.PSSN,
        Email : req.body.Email,
        Password : req.body.Password,
        FName : req.body.FName,
        LName : req.body.LName,
        Age:req.body.Age,
        Phone: req.body.Phone,
        image:req.file.path,
        Description: req.body.Description,
        Username: req.body.Username,
        Address: req.body.Address
    });
    // console.log("fileees",req.file);
    
    if (req.body.Password !== req.body.ConfirmPassword) {
        
        res.sendFile(path.join(DirName,'views','errors/signupwrongpass.html'));

    }
        
else{
        patient.findOne({where:{Email: newpatient.Email}}).then(user => {
           
            if (!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newpatient.Password, salt, (err, hash) => {
                        newpatient.Password = hash;
                        newpatient.save().then(savedUser => {
                            //res.sendFile(path.join(DirName,'views','home/user.handlebars'));
                             res.redirect('/patient/'+newpatient.PSSN); 
                        });
                       
                    });
                });
            } else {
               
                
                 res.sendFile(path.join(DirName,'views','errors/signupexistingemail.html'));
            }
        });

    }

}

exports.post_signinP = (req,res,next)=>{
    let User=null;
    let Email = req.body.Email;
    let Password = req.body.Password;
    if(Email=='admin@gmail.com' && Password == 0000){
        // res.render('/dates',{layout:false})
        res.redirect('/dates');
    }else{

        patient.findOne({where:{Email:Email}}).then(user=>{

            User=user;
            
             if(!user){
     
                 res.sendFile(path.join(DirName,'views','errors/signinwrongemail.html'));
                 console.log('email not found')
            } else{
                bcrypt.compare(Password, user.Password).then((returnedPassword) => {
                    if (returnedPassword){
                     // res.sendFile(path.join(DirName,'views','home/user.html'));
                     res.redirect('/patient/'+User.PSSN);
       
                    }
                    else{
     
                     res.sendFile(path.join(DirName,'views','errors/signinwrongpass.html'));
                    }
                });
            }
         
     });
    }
 

exports.post_signinD =  (req,res,next)=>{
   
    let Email = req.body.email;
    let Password = req.body.Pass;
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
}

exports.post_signout = (req,res,next)=>{
    // res.sendFile(path.join(DirName,'views','home/index.html'));
    res.redirect('/');
}


exports.doc_createpost =(req,res,next)=>{
    const newdoctor = new doctor({
        
        DSSN : req.body.DSSN,
        Email : req.body.Email,
        Password : req.body.pass,
        FName : req.body.FName,
        LName : req.body.LName,
        Dname:req.body.Dname,
        Phone: req.body.Phone,
        Description: req.body.Description,
        img: req.body.image
    });
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

}
}

exports.comp_post = (req,res,next)=>{
    const newcomp = new complain({
        Email:req.body.Email,
        Phone:req.body.Phone,
        FullName:req.body.FullName,
        Complaining:req.body.Complaining

    });
    newcomp.save().then( res.redirect('/'))
}
exports.clincs_date = (req,res,next)=>{
   
  
    appointment.findAll().then(appointments=>{
        res.render('datesadmin',{appointments:appointments,layout:false})
        })


}
