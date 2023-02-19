const express = require('express')
const mongoose = require('mongoose');
//redis connection
const redis=require('redis');
const REDIS_PORT=6379;
const REDIS_HOST='redis'
const redisClient = redis.createClient({
  url:`redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connect success'));
redisClient.connect();

//end redis
const app = express()
const port = 3000
const DB_USER='root'
const DB_PASSWORD='example'
const DB_PORT=27017;
const DB_HOST='mongo' // الاسم ده موجود في السيرفس اللي موجوده في الدوكر كومبوظ والدوكر بيفهم وبيروح يجيب الاي بي ويحطه 
const URL=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.set('strictQuery', true);
mongoose.connect(URL).then((res)=>{
  console.log("Connect")
}).catch((err)=>{
  console.log('fail to connect',err)
})
app.get('/', (req, res) => {
  redisClient.set("name","ahmed ali")
  res.send('Hello World! & Welcome hhh')
})
app.get('/data',async (req, res) => {
  const Redis_Data=await redisClient.get("name")
  res.send(`Hello ${Redis_Data}`)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})