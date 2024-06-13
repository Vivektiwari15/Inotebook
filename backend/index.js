require("./database/connection")
const express = require("express")
const app = express()
const port = process.env.PORT || 2000
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use("/notes",require("./routes/notes"))
app.use("/auth",require("./routes/auth"))

app.listen(port,()=>{

    console.log("port number====>",port)
})