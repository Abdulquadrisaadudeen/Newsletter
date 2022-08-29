const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
  const fname = req.body.Fname
  const lname = req.body.Lname
  const email = req.body.email


  const data = {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
        }
      }
    ]
  }

const jsonData = JSON.stringify(data);
const url = "https://us9.api.mailchimp.com/3.0/lists/b5c4a85379";

const options = {
  method: "POST",
  auth: "saadudeen:e437dd8492b9b7b6be344f7d8fad7461-us9"

}

const request = https.request(url, options, function(response){
  if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});



app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000")





});





//api key
//e437dd8492b9b7b6be344f7d8fad7461-us9

//list
//b5c4a85379
