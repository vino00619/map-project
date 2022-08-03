const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/users")
const pinRoute = require("./routes/pins")
const app = express();
const cors = require('cors');

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongoDB connected")
})
.catch((err)=>console.log(err));
//.


app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);


app.listen(8800, () => {
    console.log("server is running");
})