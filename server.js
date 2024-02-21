const dotenv = require('dotenv')
dotenv.config({path: './.env'});
const express = require('express');
const databaseConnection = require('./backend/database/database');
const Data = require('./backend/models/data');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

// db connection
databaseConnection();

app.get('/', async (req, res)=>{
    const data = await Data.find({})
    res.json(data)
})


app.post('/api/create', async (req, res)=>{
    const newData = await  Data.create({
        name : req.body.name
    })
    
    res.json(newData)
})

app.put('/api/update', async(req, res)=>{
    const { id } = req.body;
    const { name } = req.body;

    const updated = await Data.findByIdAndUpdate(id, { name} , {new: true})
    res.json(updated)
})

const port = process.env.PORT || 3001;
app.listen(port, ()=> console.log('server listening on port ' + port))