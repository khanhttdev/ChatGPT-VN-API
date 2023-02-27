import mongoose from "mongoose"

const connectDB = async (uri) => {
	mongoose.set("strictQuery", true)
	try {
		if (uri) await mongoose.connect(uri)
		console.log("Connected to MongoDB successfully")
	} catch (err) {
		console.error(err)
	}
}

export default connectDB
