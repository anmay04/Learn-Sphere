const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required.",
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;

        res.status(200).json({
            success: true,
            response: response.text(),
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            success: false,
            message: "Error generating response from Gemini.",
            error: error.message,
        });
    }
};