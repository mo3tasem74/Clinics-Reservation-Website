const Sequelize=require('sequelize');
const sequelize=require('../util/db.js');


const Patient= sequelize.define('Patient',{
    PSSN: {
    type:Sequelize.BIGINT(20),
    allowNull:false,
    primaryKey:true
    },
    FName: {
    type:Sequelize.STRING,
    allowNull:false,
    },
    LName:{
    type:Sequelize.STRING,
    allowNull:false,
    },
    Description:{
    type:Sequelize.TEXT,
    allowNull:true,
    },
    Phone:{
    type:Sequelize.BIGINT(20),
    allowNull:false,
    },
    Age:{
    type:Sequelize.INTEGER,
    allowNull:false,
    },
    Email:{
    type:Sequelize.STRING,
    allowNull:false,    
    },
    Password:{
    type:Sequelize.STRING,
    allowNull:false,    
    },
    Username:{
    type:Sequelize.STRING,
    allowNull:false,    
    },
    Address:{
    type:Sequelize.STRING,
    allowNull:false,    
    },
    image:{
        type:Sequelize.STRING,
        allowNull:true
    }

})


module.exports=Patient;