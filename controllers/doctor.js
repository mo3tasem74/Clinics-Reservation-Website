const path = require('path');
const doctor = require('../models/doctor')
const appointment=require('../models/appointment')
const DirName=require('../util/path');


exports.doctorId= (req,res,next) => {
      
    const Id = req.params.id;
    res.redirect('/doctor/table/'+Id);

}


exports.doctorTable=(req,res,next) => {
    const Id = req.params.id;
    appointment.findAll({where:{DSSN:Id}})
    .then(appoints => {
        res.render('tableD',{id:Id, appoints:appoints ,hasAppoint:appoints.length>0,layout:false})
    })

      
}

exports.doctorEdit=(req,res,next) => {
    const Id = req.params.id;
    doctor.findOne({where:{DSSN: Id}}).then(doctor => {
     res.render('userD',{doctor:doctor,layout:false});
    })
    .catch(err => {
        console.log("editdoctorError");
    })
 
}

exports.editData =(req,res,next) => {
    const newdoctor = new doctor({
        DSSN:req.params.id,
        Email : req.body.Email,
        FName : req.body.FName,
        LName : req.body.LName,
        Phone: req.body.Phone,
        Description: req.body.Description,
        Dname: req.body.Dname,
    });

// console.log(req.body);
doctor.findOne({where:{ DSSN:newdoctor.DSSN }}).then(doctor => {
    newdoctor.FName ? doctor.FName=newdoctor.FName : null;
    newdoctor.LName ?  doctor.LName=newdoctor.LName : null;
    newdoctor.Username ?  doctor.LName=newdoctor.LName : null;
    newdoctor.Email ? doctor.Email=newdoctor.Email : null;
    newdoctor.Dname ? doctor.Dname=newdoctor.Dname : null;
    newdoctor.Phone ? doctor.Phone=newdoctor.Phone : null;
    newdoctor.Description ? doctor.Description=newdoctor.Description : null;
    doctor.save();
})
.then( result => {
    res.redirect('/doctor/edit/'+newdoctor.DSSN)
})
.catch(err => console.log("ubdate doctor",errr))

}