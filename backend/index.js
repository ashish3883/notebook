const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

connectToMongo()
 
app.use(express.json())
app.use(cors())

//Available routes 
app.get("/", (req, res)=>{
  res.send("This is Home Page")
})
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})