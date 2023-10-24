require("dotenv").config();

const OpenAI = require("openai");

async function main() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  /* This is the example how to list engines */
  const list = await openai.models.list();
  for await (const model of list) {
    console.log(model);
  }
  /* This is the example how to chat with GPT-3 */
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-3.5-turbo",
  });
  console.log(completion);
  console.log(completion.choices[0]);
  /* This is the example how to generate image with DALL-E */
  const image = await openai.images.generate({
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  image_url = image.data[0].url;
  console.log(image_url);
  /* TODO: This is the example how to extend image with DALL-E */
  const edit_image = await openai.images.edit({
    image: fs.createReadStream("otter.png"),
    mask: fs.createReadStream("mask.png"),
    prompt: "A cute baby sea otter wearing a beret",
  });
  edit_image_url = edit_image.data[0].url;
  console.log(edit_image_url);
}

main();
