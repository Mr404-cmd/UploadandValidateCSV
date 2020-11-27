const  express = require ("express");
const csvtojson = require("csvtojson");
const  dbConnect  = require ("../config/db");
const path = require("path")
const router = new express.Router();
 const csvfilepath = "data.csv"
const UserRoute = () => {

router.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.file;
            console.log(req.files);
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});  

router.get("/getcsv", async (req, res) => {
    try {
        csvtojson()
        .fromFile(csvfilepath)
        .then((jsonobj)=>{
            res.send(jsonobj)
        })
    } catch (e) {
      console.log(e);
      res.send({
        code: 500,
        msg: e.message,
      });
    }
  });

  router.post("/storecsv", async (req, res) => {
    try {
        csvtojson()
        .fromFile(csvfilepath)
        .then((jsonobj)=>{
            jsonobj.forEach((val)=>{
                if (isNaN(val["userName"])===false && val["userName"].includes('@') && val[userName].length<=15) {
                    res.send({
                        code:202,
                        msg:"Username is Not valid"
                    })
                }else if(isNaN(val["email"])===false && val["email"].includes('@')==false){
                    res.send({
                        code:202,
                        msg:"email is Not valid"
                    })
                }else if((isNaN(val["age"]) && val["age"].length>=3)){
                    res.send({
                        code:202,
                        msg:"age is Not valid"
                    })
                }else{
                dbConnect.query(`Insert into userData (userName,email,age,salary,mobile,address,profession,adhar,pan,gender) values (${JSON.stringify(val["userName"])},${JSON.stringify(val["email"])},${JSON.stringify(val["age"])},${JSON.stringify(val["salary"])},${JSON.stringify(val["mobile"])},${JSON.stringify(val["address"])},${JSON.stringify(val["profession"])},${JSON.stringify(val["adhar"])},${JSON.stringify(val["pan"])},${JSON.stringify(val["gender"])})`, (err,data)=>{
                    if(err){
                        console.log("Error"+err);
                    }else{
                        console.log("record saved successFully");
                    }
                })
            }
        })
})
    } catch (e) {
      console.log(e);
      res.send({
        code: 500,
        msg: e.message,
      });
    }
  });

  return router;
};
module.exports = UserRoute;