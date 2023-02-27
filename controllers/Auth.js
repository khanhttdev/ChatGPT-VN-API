import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
dotenv.config()

export const register = async (req, res, next) => {
	try {
		const hash = await bcrypt.hash(req.body.password, 10)
		const user = new User({
			...req.body,
			password: hash,
		})
		await user.save()
		res.status(201).json({ message: "User created!" })
	} catch (error) {
		res.status(500).json({ error })
	}
}

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username })
		if (!user) {
			return res.status(401).json({ error: "User not found!" })
		}
		const valid = await bcrypt.compare(req.body.password, user.password)
		if (!valid) {
			return res.status(401).json({ error: "Incorrect password!" })
		}
		// const newChatroom = new Chat({ userId: user._id, messages: [] })
		// const chatRoom = await newChatroom.save()

		res.status(200).json({
			userId: user._id,
			avatar: user.avatar,
			token: jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "24h",
			}),
			// chatRoom: chatRoom,
		})
	} catch (error) {
		res.status(500).json({ error })
	}
}
