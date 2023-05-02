import express from "express";

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { language, network, about } = req.body;

    console.log("----------BEFORE")
    
    const model = 'davinci';
    // const prompt = `${about} ${network} ${language}`;
    const prompt = about;
    const parameters = {
      maxTokens: 150,
      temperature: 0.7,
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
    console.log("----------AFTER", data)
    
  const generatedText = data.choices[0].text;
    console.log(generatedText);
    res.status(200).json({success: true, data: generatedText})
} catch (e) {
  console.log(e);
}
});


export default router;