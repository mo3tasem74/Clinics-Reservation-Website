const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Dates= sequelize.define('Dates',{
    Date: {
    type:Sequelize.STRING,
    allowNull:false,
    },
    Price:{
    type:Sequelize.INTEGER,
    allowNull:true,
    },
    Dname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    Time:{
        type:Sequelize.TIME,
        allowNull:true
    }


})


module.exports=Dates;