const express = require('express')
const path = require('path')
const DirName=require('./util/path');
const bodyParser=require('body-parser');
const exphbs=require('express-handlebars');
const sequelize=require('./util/db')
const Doctor=require('./models/doctor')
const Patient=require('./models/patient')
const Dates=require('./models/date')
const Appointment=require('./models/appointment')
const Complain=require('./models/complain')
const mainRoutes = require('./routes/main')
const patientRoutes = require('./routes/patient')
const doctorRoutes = require('./routes/doctor')
const app = express()
var cookieParser = require('cookie-parser');
const multer =require('multer');
var session = require('express-session');
const flash = require('req-flash');
app.engine('handlebars', exphbs({layout: false}));
app.set('view engine', 'handlebars');
app.set('views','views/home');
// parsing the request's body  to enable working with it
app.use(bodyParser.urlencoded({extended:false}))
//multer for images
const filestorage =multer.diskStorage ({
  destination:(req,file,cb) => {
    cb(null,'public/images');
  },
  filename:(req,file,cb) => {
    cb(null,'_'+file.originalname);
  }
})
const filefilter = ( req ,file,cb) => {
if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'  )
{
  cb(null,true);
} else{
 cb(null,false);
}
}

app.use(multer({dest:'public/images',storage:filestorage,fileFilter:filefilter }).single('image'));
// const viewsDirectory = path.join(DirName,'views/home');
app.use(express.static(DirName+'/public/'));

// using the routes in the routes file 
app.use(patientRoutes);
app.use(mainRoutes);
app.use(doctorRoutes);

app.use(cookieParser());;
app.use(session({secret:'123'}));
app.use(flash());
flash({ locals: 'flash' })



// synchronizing with database 
sequelize.sync().then(res => { 
  app.listen(3000,() => {
    console.log('Running')
   })
  
})
.catch(err => {
  console.log("err:" ,err);
})



