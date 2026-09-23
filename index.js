const express = require('express');
const cors=require('cors')
const app = express()
const port = 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Server is working.....')
})

// mongodb drivers codes
const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // collections
    
    const database=client.db('khalekuzzaman')
    const skillCollection=database.collection("skills")
    const projectCollection=database.collection("Projects")
    const certificateCollection=database.collection("certificates")
    const expericenceCollection=database.collection("expericences")

    // post expericence
    app.post('/api/experience/post',async(req,res)=>{
      const expericence=req.body
      const result=await expericenceCollection.insertOne(expericence);
      res.send(result);
    })

    // post skill

    app.post('/api/skill/post',async(req,res)=>{
      const skill=req.body
      const result=await skillCollection.insertOne(skill)
      res.send(result)
    })

    // get frontend skill
    app.get('/api/frontendskill/get',async(req,res)=>{
      const result=await skillCollection.find({category:'Frontend'}).toArray()
      res.send(result)

    })
    // get backend skill
    app.get('/api/backendskill/get',async(req,res)=>{
      const result=await skillCollection.find({category:'Backend'}).toArray()
      res.send(result)

    })
    // get database skill
    app.get('/api/databaseskill/get',async(req,res)=>{
      const result=await skillCollection.find({category:'Database'}).toArray()
      res.send(result)

    })
    // get tools skill
    app.get('/api/toolskill/get',async(req,res)=>{
      const result=await skillCollection.find({category:'Tools'}).toArray()
      res.send(result)

    })

  


    // post project
    app.post('/api/project/post',async(req,res)=>{
     const project=req.body
     const result=await projectCollection.insertOne(project)
     res.send(result)
    })
    // get project
    app.get('/api/project/get',async(req,res)=>{
      const result=await projectCollection.find().toArray()
      res.send(result)
    })
    
    // get dynamic project
    app.get('/api/project/get/:id',async(req,res)=>{
      const {id}=req.params;
      const result =await projectCollection.findOne({
        _id:new ObjectId(id)
      })
      res.send(result)
    })

    //post certificate
    app.post('/api/certificate/post',async(req,res)=>{
      const certificate= req.body
      const result=await certificateCollection.insertOne(certificate)
      res.send(result)
    }) 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app;