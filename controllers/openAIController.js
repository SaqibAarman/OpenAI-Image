const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const data = req.body;

  const imageSize =
    data.size === "small"
      ? "256x256"
      : data.size === "medium"
      ? "512x512"
      : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt: data.prompt,
      n: data.noImg,
      size: imageSize,
    });

    const imageURL = response.data.data;

    res.status(200).json({
      success: true,
      data: imageURL,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      msg: "The Image Could Not Be Generated!!!",
    });
  }
};

module.exports = { generateImage };
