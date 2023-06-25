import express from 'express';

const app = express();
// const env = require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT :${PORT}`);
})

export default app;
