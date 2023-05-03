import express from "express";

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { language, network, about } = req.body;
    const model = 'davinci';
    const prompt = `I would like you to write about :${about}, for this network :${network} in this language : ${language}. Please make sure to include relevant hashtags and emojis to attract user attention.`;
    const parameters = {
      maxTokens: 200,
      temperature: 0.5,
    };
    
    const response = await fetch('https://api.openai.com/v1/engines/' + model + '/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: parameters.maxTokens,
        temperature: parameters.temperature,
      }),
    })
    
 
    const data = await response.json();
    
  const generatedText = data.choices[0].text;
    res.status(200).json({success: true, data: generatedText})
} catch (e) {
  console.log(e);
}
});


export default router;