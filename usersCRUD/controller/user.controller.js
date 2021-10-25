const querys = require("../db/querys");
const getConnection = require("../db/connection");
const isSouthOrNorth = require("../utils/geoLocations");
const mysql = require('mysql2/promise');

const userCtrl = {};
const dbSettings = {
  user: 'root',
  password: 'gos04965',
  server: 'localhost',
  database: 'gen_schema',
  insecureAuth : true
};
userCtrl.getUsers = async (req, res) => {
  try {
    const connect = await getConnection();
    const [rows,fields] = await connect.execute(querys.getUsers);
    res.json(rows);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

};

userCtrl.addUser = async (req, res) => {
  const { userName, email, password, latitude, longitude, language } = req.body;
  // validating
  if (userName == null || email == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill UserName and e-mail" });
  }
  if (latitude == null) latitude = 0;
  if (longitude == null) longitude = 0;

   try {
     console.log('AddUsser..'+userName);
     location= await isSouthOrNorth(latitude,longitude);
      if (location === 'N'){
        const connect = await getConnection();
        console.log("Send to server for user North hemisphere, inserting...");
        await connect.query(querys.addUser,[userName, email, password,latitude,longitude, language], (error,results) => {
              if (error) return res.json({ error: error });
              });
      }else{
        console.log("Send to server for user South hemisphere");
        ///  Datos para servidor que almacenara los usuarios localizados en el hemisferio sur.
        //var client = new Client();
        const END_PONT_SERVIDOR =  '';
        dataWS = {
              // datos a enviar al servidor 
        }
         var args = {
          data: dataWS,
          headers: { "Content-Type": "application/json" }
         };
         // consume ws 
         /*client.post(END_PONT_SERVIDOR, args, function (datas, response) {
          console.log(datas);
         //console.log(response);
         });*/
      }
        res.status('201').json({ userName, email, password });
   } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

userCtrl.delUserById = async (req, res) => {
  try {
    const connect = await getConnection();
    console.log("Deleting...");
    await connect.query(querys.delUser,[req.params.id], (error,results) => {
          if (error) return res.status(404).json({ error: error });
     });

    return res.status(204).json({ successRemove: req.params.id  });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};



userCtrl.updateUserById = async (req, res) => {
  const { userName, email, password, latitude, longitude, language } = req.body;
  // validating
  if (userName == null || email == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill UserName and e-mail" });
  }
  
  try {
    const connect = await getConnection();
        console.log("Updating User..."+userName);
        await connect.query(querys.updateUserById,[ email, password,latitude,longitude, language,req.params.id], (error,results) => {
              if (error) return res.json({ error: error });
              });
    res.json({ userName, email, password,latitude,longitude, language });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = userCtrl;
