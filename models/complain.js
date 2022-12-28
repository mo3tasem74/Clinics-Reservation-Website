const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Complain= sequelize.define('Complain',{
    Email: {
    type:Sequelize.STRING,
    allowNull:false,
    primaryKey:true
    },
    FullName: {
    type:Sequelize.STRING,
    allowNull:false,
    },
    Complaining:{
    type:Sequelize.TEXT,
    allowNull:true,
    },
    Phone:{
    type:Sequelize.BIGINT(20),
    allowNull:false,
    },
})



module.exports=Complain;