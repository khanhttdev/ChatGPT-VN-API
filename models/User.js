import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			default:
				"https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg",
		},
		username: { type: String, required: true },
		password: { type: String, required: true, min: 8 },
		chatRoom: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
	},
	{ timestamps: true }
)

const User = mongoose.model("User", UserSchema)

export default User
