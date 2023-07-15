const express = require("express")
const app = express();
const port = 80;
const path = require("path");
const bodyparser = require('body-parser')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});


var contactSchema = new mongoose.Schema({
    naam :String,
    phone :String,
    email :String,
    address :String,
    desc :String

});
var Contact = mongoose.model('Contact',contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

app.get("/",(req,res)=>{
    
    const bhai = {};
    res.status(200).render('Home.pug',bhai);
    
});
app.get("/contact",(req,res)=>{
    
    res.status(200).render('contact.pug');
    
});
app.post("/contact",(req,res)=>{
    
    var MyData = new Contact(req.body);
    MyData.save().then(()=>{
        res.send("This item has been sent to the database ")
    }).catch(()=>{
        res.status(400).send("Item was not saved in the database ")
    })
    res.status(200).render('contact.pug');
    
});

app.listen(port,()=>{
    console.log(`The application started successfully at port ${port}`)
});