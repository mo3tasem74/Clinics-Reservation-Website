const path = require('path');
const patient = require('../models/patient')
const DirName=require('../util/path');
const doctor =require('../models/doctor');
const date =require('../models/date');
const appointment =require('../models/appointment');


exports.Neurology= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Neurology'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Neurology'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.length>0,id:id , dates:dates, hasDates:dates.length>0,layout:false});
    });
    
}

exports.Cardiology= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Cardiology'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Cardiology'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.length>0 ,id:id ,dates:dates, hasDates:dates.length>0 ,layout:false});
    });
}
exports.Nuclear_Magnetic= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Nuclear_Magnetic'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Nuclear_Magnetic'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.length>0 ,id:id ,dates:dates, hasDates:dates.length>0 ,layout:false});
    });
    
}
exports.Surgical= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Surgical'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Surgical'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.lenght>0 ,id:id ,dates:dates, hasDates:dates.length>0 ,layout:false});
    });
}
exports.Traumatology= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Traumatology'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Traumatology'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.length>0 ,id:id ,dates:dates, hasDates:dates.length>0 ,layout:false});
    });
    
}
exports.Opthalmology= (req,res,next) => {
    const id= req.params.id;
    let dates=null;
    date.findAll({where:{Dname:'Ophthalmology'}}).then( result => {
        dates=result;
    });
    doctor.findAll({where:{Dname:'Opthalmology'}}).then(result => {
        res.render('clinics',{doctors:result, hasDoctor:result.length>0 ,id:id ,dates:dates, hasDates:dates.length>0 ,layout:false});
    });
    
}


exports.appoint= (req,res,next) => {
    let patientId=req.params.id;
    let doctorId=req.body.doctorId;
    let date=req.body.date;
    let description=req.body.Description;
    console.log("description",description);
    
    // console.log("here",doctorId,patientId)
    patient.findOne({where:{PSSN:patientId}})
    .then(P => {
    
        return doctor.findOne({where:{DSSN:doctorId}})
        .then(D => {
           return appointment.create({PSSN:P.PSSN,DSSN:D.DSSN,Price:date.split('-')[2],Description:description,Date:date.split('-')[0],Time:date.split('-')[1],Price:date.split('-')[2],DoctorFName:D.FName,DoctorLName:D.LName,PatientFName:P.FName,PatientLName:P.LName})
            // return D.addPatient(P,{through:{Description:description, Date:date.split('-')[0],Time:date.split('-')[1],Price:date.split('-')[2],DoctorFName:D.FName,DoctorLName:D.LName}})
        })     
    })
    .then(res => {
    } )
    .catch(err => console.log(err));
    res.redirect('/patient/table/'+patientId)

    // doctorData.addPatient(patientData,{through:{Date:null}}).then().catch( err => console.log("apoint",err));
// console.log(patientData.PSSN,doctorData.DSSN);

}


exports.patientId= (req,res,next) => {
      
    const Id = req.params.id;
    res.redirect('/patient/Home/'+Id);

}

exports.patientHome=(req,res,next) => {
    
  const Id = req.params.id;
//   res.sendFile(path.join(DirName,'views','home/dashboard.html'));
res.render('dashboard',{id:Id,layout:false});

}

exports.patientTable=(req,res,next) => {
    const Id = req.params.id;
    appointment.findAll({where:{ PSSN:Id}})
    .then(appoints => {
        res.render('tableP',{id:Id, appoints:appoints ,hasAppoint:appoints.length>0,layout:false})
    })

      
}

exports.patientEdit=(req,res,next) => {
    const Id = req.params.id;
    
    patient.findOne({where:{PSSN: Id}}).then(patient => {
     res.render('user',{patient:patient,url:patient.image.split('/')[2],layout:false});
    })
    .catch(err => {
        console.log("editPatientError");
    })
 
}

exports.editData =(req,res,next) => {
    const newpatient = new patient({
        PSSN:req.params.id,
        Email : req.body.Email,
        FName : req.body.FName,
        LName : req.body.LName,
        Phone: req.body.Phone,
        Description: req.body.Description,
        Username: req.body.Username,
        Address: req.body.Address,
        Age   : req.body.age
    });

// console.log(req.body);
patient.findOne({where:{ PSSN:newpatient.PSSN }}).then(patient => {
    newpatient.FName ? patient.FName=newpatient.FName : null;
    newpatient.LName ?  patient.LName=newpatient.LName : null;
    newpatient.Username ?  patient.LName=newpatient.LName : null;
    newpatient.Email ? patient.Email=newpatient.Email : null;
    newpatient.Age ? patient.Age=newpatient.Age : null;
    newpatient.Address ? patient.Address=newpatient.Address : null;
    newpatient.Phone ? patient.Phone=newpatient.Phone : null;
    newpatient.Description ? patient.Description=newpatient.Description : null;
    patient.save();
})
.then( result => {
    res.redirect('/patient/edit/'+newpatient.PSSN)
})
.catch(err => console.log("ubdate patient",errr))

}