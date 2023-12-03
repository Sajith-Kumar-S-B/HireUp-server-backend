

const express = require('express')
const jobServer = express()
const cors = require('cors')
const port = process.env.PORT || 4000 
require("dotenv").config()
require('./db/connection')
const router = require('./Router/router')
// console.log(process.env.DATABASE)


jobServer.use(express.json())
jobServer.use(cors())
jobServer.use(router)
jobServer.use('/uploads',express.static('./uploads'))

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `${process.env.DATABASE}`;

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

  // create db

  const db = client.db("hireUp_jobs")
  const jobsCollection = db.collection("jobs")
    




  
// post a job




jobServer.post("/post-job",async(req,res)=>{
  const body = req.body
  body.createAt = new Date();
  // console.log(body)
  const result = await jobsCollection.insertOne(body)
  if(result.insertedId){
    return res.status(200).send(result)
  }else{
    return res.status(404).send({
      message:"Cannot Add try again",
      status:false
    })
  }

})


  // get all jobs

  jobServer.get("/all-jobs",async(req,res)=>{
    const jobs = await jobsCollection.find({}).toArray()
    res.send(jobs);
  })

// get a job by id

jobServer.get("/all-jobs/:id",async(req,res)=>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)}

  const jobs = await jobsCollection.findOne(filter);
  res.send(jobs)

})


// get jobs by email
jobServer.get("/my-jobs/:email",async(req,res)=>{
  // console.log(req.params.email)
  const jobs = await jobsCollection.find({postedBy:req.params.email}).toArray();
  res.send(jobs);

})


// delete a job

jobServer.delete("/jobs/delete/:id",async(req,res)=>{
  const id = req.params.id
  const filter = {_id: new ObjectId(id)}
  const result = await jobsCollection.deleteOne(filter)
  res.send(result)
})


// update job

jobServer.patch("/update-job/:id",async(req,res)=>{
  const id = req.params.id
  const jobsData = req.body
  const filter = {_id: new ObjectId(id)}
 const options = {upsert:true};
 const updateJob = {
  $set:{
    ...jobsData
  },
 };
 const result = await jobsCollection.updateOne(filter,updateJob,options)
   res.send(result)

})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("jobServer successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



jobServer.get('/', (req, res) => {
  res.send('Hello Dev!')
})

jobServer.listen(port, () => {
  console.log(`Hireup app listening on port ${port}`)
})
















