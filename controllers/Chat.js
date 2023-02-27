import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { createCompletionChatGPT } from "../middlewares/chatGPT.js"
import { createError } from "../middlewares/error.js"
import Chat from "../models/Chat.js"
dotenv.config()

export const newRoom = async (req, res, next) => {
	try {
		const authHeader = req.get("Authorization")
		if (authHeader) {
			const token = authHeader && authHeader.split(" ")[1]
			jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
				if (err) return next(createError(403, "Token is not valid!"))
				return (req.user = user)
			})
		}

		const newRoom = new Chat({
			userId: req.user ? req.user._id : "63689392b2104129d20c5720",
		})
		const room = await newRoom.save()
		res.status(200).json(room._id)
	} catch (err) {
		next(err)
	}
}

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body
		const newChat = new Chat({
			messages: [{ message: message, textBy: 1 }],
		})
		await newChat.save()
		const response = await createCompletionChatGPT({
			message: message,
		})

		await Chat.updateOne(
			{ _id: newChat._id },
			{
				$push: {
					messages: { message: response, textBy: 0 },
				},
			},
			{ new: true }
		)
		res.status(201).json({ message: response })
	} catch (error) {
		res.status(400).send({ success: false, message: error.message })
	}
}

export const getMessages = async (req, res, next) => {
	try {
		const messages = await Chat.find({})
		if (messages.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No messages found",
			})
		}
		res.status(200).json({ data: messages })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
}

export const getAllRoomIsOpen = async (req, res, next) => {
	try {
		const roomOpen = await Chat.find({}).populate("userId")

		res.status(200).json(roomOpen)
	} catch (err) {
		next(err)
	}
}
