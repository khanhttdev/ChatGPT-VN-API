import mongoose from "mongoose"

const ChatSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	messages: [
		{
			message: String,
			textBy: Number,
		},
	],
})

const Chat = mongoose.model("Chat", ChatSchema)
export default Chat
