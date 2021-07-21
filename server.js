if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}


const express = require('express')
const app = express() 
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')
const authorRouter = require('./routes/author') 
const bookRouter = require('./routes/books') 

app.set('view engine',"ejs")
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false}))
app.use(express.json());
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false

}).then(()=>{
    console.log("Connection Successful")
}).catch((err)=>{
console.log("Connection not Successful")
});


app.use("/",indexRouter)
app.use("/authors", authorRouter)
app.use("/books", bookRouter)


// const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000);
