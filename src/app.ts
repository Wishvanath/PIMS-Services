import express from 'express';

import routes from './routes';

const app = express();
// const env = require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/pims-services/api', routes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT :${PORT}`);
})

export default app;
