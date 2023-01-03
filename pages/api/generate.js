import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Give me a list of simple recipe ideas with preparation steps based on available ingredients

Ingredients:
`;



const generateAction = async (req, res) => {
  // Run first prompt

 debugger;
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\nCuisine: ${req.body.userInput1}`,
    temperature: 0.9,
    max_tokens: 1250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;