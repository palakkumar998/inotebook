//ENTRY POINT FOR BACK END
const connectToMongo = require('./db');
const express = require('express');

connectToMongo();
const app = express()
const port = 5000;

//middleware:
app.use(express.json())

//available routes:
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))



app.listen(port, () => {
    console.log(`Example app listening on port https://localhost:${port}`)
})