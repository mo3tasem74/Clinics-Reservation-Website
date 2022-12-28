const Sequelize=require('sequelize');

// hosting online using db4free

// const sequelize = new Sequelize('sbme_team1','team01','web_team1',{
//     host:'db4free.net',
//     dialect:'mysql'
   
// });

// hosting locally
const sequelize = new Sequelize('web_project','root','',{
  host:'localhost',
  dialect:'mysql'
 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

module.exports = sequelize;
