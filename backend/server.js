import 'dotenv/config'
import express from 'express'
const app = express();
import cors from 'cors'
import router from './routes/routes.js';
import connectDB from './config/db.js';

connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/api/v1', router)

app.get('/', (req, res)=>{
  res.status(200).json({
    success: true, 
    message: "API Working!"
  })
})

app.listen(8000, () => {
  console.log("server is listening on http://localhost:8000");
});


export default app