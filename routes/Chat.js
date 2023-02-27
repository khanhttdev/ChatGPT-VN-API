import express from "express"
import {
	getAllRoomIsOpen,
	getMessages,
	newRoom,
	sendMessage,
} from "../controllers/Chat.js"
const router = express.Router()

router.post("/newRoom", newRoom)
router.post("/sendMessage", sendMessage)
router.get("/roomOpen", getAllRoomIsOpen)
router.get("/getMessages", getMessages)

export default router
