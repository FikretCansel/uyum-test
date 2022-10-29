const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());



app.get('/', function(req,res,next) {
  let result = req.query.result || false;
  res.render('rapport', { result: result });
});

app.post('/see',(req,res,next)=> {
  let girlName = req.body.girl.toLowerCase();
  let boyName  = req.body.boy.toLowerCase();


  const newResult= Math.floor(Math.random() * 101);

  if(boyName==="fikret" && girlName==="esra" || boyName==="esra" && girlName==="fikret" || boyName==="fikret cansel" && girlName==="esra aksoy" || boyName==="esra aksoy" && girlName==="fikret cansel" ){
    res.redirect(`/?result=1000`);
  }else {
    fs.readFile('./src/names.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        var newData=[]
        for (var apply of JSON.parse(data)) {
          if(apply.boy==boyName && apply.girl==girlName){
            res.redirect(`/?result=${apply.scor}`)
            return;
          }
          newData.push(apply);
        }
        newData.push({boy:boyName,girl:girlName,scor:newResult});
        fs.writeFile('./src/names.json', JSON.stringify(newData), function (err) {
          if (err){
            console.log("kaydetmede sorun var")
            return;
          } else res.redirect(`/?result=${newResult}`)
        });
  }});
  };
});


const port = 3000;
app.listen(port, () => console.log(`Run on port ${port}`));