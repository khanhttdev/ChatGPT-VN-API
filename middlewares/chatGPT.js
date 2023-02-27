import dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"
dotenv.config()

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
	// organization: process.env.OPENAI_ORG_KEY,
})

const openai = new OpenAIApi(configuration)

export async function createCompletionChatGPT({ message }) {
	try {
		const completion = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: message,
			max_tokens: 2048,
			temperature: 0,
		})
		const response = completion.data.choices[0].text
		return response
	} catch (error) {
		if (error.response) {
			console.log(error.response.status)
			console.log(error.response.data)
		} else {
			console.log(error.message)
		}
	}
}
