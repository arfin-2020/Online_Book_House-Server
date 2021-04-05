const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 5055
const cors = require('cors')
require('dotenv').config()


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r5j5a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("onlineshopping").collection("books");

  app.get('/photosurl',(req, res)=>{
    productsCollection.find()
    .toArray((err,items)=>{
      res.send(items);
      // console.log('database response',items);
    })
  })

  app.get('/order/:id',(req, res)=>{
    productsCollection.find({id:req.params.id})
    .toArray((err,items)=>{
     const result= res.send(items[0]);
     
    })
  })

  app.post('/addphoto',(req, res) => {
    const newphoto = req.body;
    console.log('adding new photo',newphoto);
    productsCollection.insertOne(newphoto)
    .then(result =>{
      console.log('inserted Count',result.insertedCount)
      res.send(result.insertedCount > 0)
    })
  })
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)