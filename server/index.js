const express = require("express");
const router = require("./src/routes")
const app = express()
const port = 8000

const cors = require('cors')
// const http = require('http')
// const server = http.createServer(app)

require("dotenv").config()
app.use(cors())


app.use(express.json());
app.use("/api/v1/", router)
app.use('/uploads', express.static('uploads'))
app.listen(port, () => console.log("server on port 8000"))