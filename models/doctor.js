const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Doctor= sequelize.define('Doctor',{
    DSSN: {
    type:Sequelize.BIGINT(20),
    allowNull:false,
    primaryKey:true
    },
    FName: {
    type:Sequelize.STRING,
    allowNull:true,
    },
    LName:{
    type:Sequelize.STRING,
    allowNull:true
    },
    Email:{
    type:Sequelize.STRING,
    allowNull:false,
    },
    Password:{
    type:Sequelize.STRING,
    allowNull:false,
    },
    Phone:{
    type:Sequelize.BIGINT(20),
    allowNull:false,
    },
    Dname:{
    type:Sequelize.STRING,
    allowNull:false,
    },
    Description:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    img:{
        type:Sequelize.STRING,
        allowNull:true
    }



})


module.exports=Doctor;