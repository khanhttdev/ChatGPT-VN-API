import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import connectDB from "./middlewares/connectDB.js"
import AuthRoutes from "./routes/Auth.js"
import ChatRoutes from "./routes/Chat.js"

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
dotenv.config()

//* Routes
app.use("/chat", ChatRoutes)
app.use("/auth", AuthRoutes)

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL)
		app.listen(port, () => console.log(`Server started on port ${port}`))
	} catch (error) {
		console.log(error)
	}
}

startServer()
