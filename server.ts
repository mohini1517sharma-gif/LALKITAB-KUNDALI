import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for personalized Lal Kitab Guidance & Obstacle Resolution
app.post('/api/guidance', async (req, res) => {
  const {
    name,
    gender,
    dob,
    tob,
    pob,
    currentAge,
    majorObstacle,
    planetaryPositions,
    debts,
    marriageYear,
    wealthIndex,
  } = req.body;

  const prompt = `You are the master astrological guidance engine of "Arun Samhita - Lal Kitab (1999 Edition)" created by astrologer Mohini Sharma.
A seeker has approached you for guidance regarding their Lal Kitab Kundali and major life obstacles.

Seeker Details:
- Name: ${name || 'Seeker'}
- Gender: ${gender || 'Not specified'}
- Date of Birth: ${dob} (${tob || 'Time N/A'}, ${pob || 'Place N/A'})
- Current Age: ${currentAge || 'N/A'} years
- Major Life Obstacle / Question: "${majorObstacle || 'General Life Guidance, Marriage, Financial Growth & Evil Eye Protection'}"
- Lal Kitab Planetary Placements (Khana 1 to 12):
${JSON.stringify(planetaryPositions, null, 2)}
- Identified Karmic Debts (ऋण): ${debts?.join(', ') || 'None detected'}
- Lal Kitab Marriage Age/Window: ${marriageYear || 'Evaluated in chart'}
- Lal Kitab Wealth Index: ${wealthIndex || 'Calculated in chart'}

Provide a profound, authentic, reassuring, and highly actionable Lal Kitab consultation in both Hindi and English.
Structure the response with the following exact sections:

1. **तात्कालिक ग्रह स्थिति व मूल कारण (Astrological Root Cause in Lal Kitab)**:
Explain clearly which planet (e.g. Rahu in 8/12, Shani-Surya takrav, Ketu in 6, Mangal Bad, Soya Grah) is triggering their current roadblock according to Arun Samhita principles.

2. **विवाह व पारिवारिक जीवन (Marriage & Relationship Analysis)**:
Analyze their marital prospects, partner nature, specific age window, and precautions (such as not marrying before age 21 or 24 if afflicted, or donation of pure silver / gold pieces as per Farman 17).

3. **आर्थिक उन्नति व धन संचय (Financial Growth & Prosperity Timing)**:
Analyze their income stream, 35-year cycle phase, "Maya ke Teen Naam" (Parsu, Parsa, Parasram), and auspicious years for business/job.

4. **नज़र दोष, ऊपरी हवा व नकारात्मक ऊर्जा सुरक्षा (Evil Eye & Black Magic Defense)**:
Detailed diagnosis of any psychic attacks, buri nazar, or Rahu/Ketu/Saturn malefic aura, and protective talismans (solid silver ball, copper square, 43-day remedies).

5. **अचूक लाल किताब उपाय (Unbreakable Lal Kitab Totke & Daily Discipline)**:
Provide 3 to 5 precise, practical, and non-harmful Lal Kitab remedies from the Arun Samhita (e.g., uninterrupted 40-43 day period, feeding dogs/cows/birds, items in running water, precautions about south door or unbaked floors).

Tone: Wise, compassionate, authentic to Arun Samhita, deeply traditional yet modernly accessible.`;

  try {
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({
        success: true,
        guidance: response.text || '',
        source: 'gemini',
      });
    }
  } catch (error) {
    console.error('Error generating AI guidance:', error);
  }

  // Graceful rule-based Lal Kitab fallback
  const fallbackGuidance = `### तात्कालिक ग्रह स्थिति व मूल कारण (Astrological Root Cause in Lal Kitab)
लाल किताब (अरुण संहिता 1999 संस्करण) के अनुसार, आपकी कुण्डली में ग्रहों की दृष्टि एवं खानों के हिसाब से कर्म बंधन सक्रिय हैं। यदि खाना नं० 8 अथवा 12 में राहु/केतु अथवा शनि का मंदा असर हो, तो जीवन में अचानक रुकावटें, मानसिक अशांति और नजर दोष के लक्षण प्रकट होते हैं।

### विवाह व पारिवारिक जीवन (Marriage & Relationship Analysis)
लाल किताब के फरमान 17 के अनुसार, शुक्र और बुध शादी के मुख्य कारक हैं। आपके योग के अनुसार विवाह का शुभ काल 21, 24, 25 या 28वें वर्ष में विशेष रूप से फलीभूत होता है। यदि वैवाहिक जीवन में तनाव या विलंब हो, तो कन्यादान की सहायता करना तथा शुद्ध चांदी का चौकोर टुकड़ा अपने पास रखना अति शुभकारी माना गया है।

### आर्थिक उन्नति व धन संचय (Financial Growth & Prosperity)
लाल किताब में धन का खजाना खाना नं० 2, 4 और 11 से देखा जाता है। 35 साला चक्र के अनुसार आपकी आयु में धन की बरकत के द्वार खुल रहे हैं। अपनी नेक कमाई का दशमांश अथवा गाय-कुत्ते-कौवे को ग्रास देने से "परसराम" जैसी उच्च आर्थिक संपन्नता का योग बनता है।

### नज़र दोष, ऊपरी हवा व नकारात्मक ऊर्जा सुरक्षा (Evil Eye & Black Magic Protection)
यदि अज्ञात भय, कार्यों में अंतिम समय पर अड़चन या नींद में बेचैनी रहती हो, तो यह राहु का धुंधला प्रभाव (नज़र दोष) है। इसके लिए:
1. अपनी जेब या तकिए के नीचे ठोस चाँदी की गोली (Solid Silver Ball) रखें।
2. 40-43 दिन लगातार बहते पानी में कच्चा कोयला या नारियल प्रवाहित करें।
3. घर के मुख्य द्वार पर अंधेरा न रहने दें और दक्षिण दिशा में खिड़कियां बंद रखें।

### अचूक लाल किताब उपाय (Prescribed Lal Kitab Remedies)
1. **माथे व नाभि पर केसर तिलक:** प्रतिदिन प्रातः काल शुद्ध केसर का तिलक नाभि और माथे पर लगाएं।
2. **कुत्तों व कौवों की सेवा:** प्रतिदिन मीठी रोटी तंदूर में बनवाकर या तवे पर बनाकर काले व दो-रंगे कुत्तों को खिलाएं।
3. **सत्य व चरित्र की पवित्रता:** लाल किताब का महामंत्र है कि मुफ्त का माल न लें और पराई स्त्री/पुरुष के प्रति मन में विकार न आने दें। 43 दिन का कोई भी उपाय बिना नागा (unbroken) पूर्ण करें।`;

  return res.json({
    success: true,
    guidance: fallbackGuidance,
    source: 'rule-based',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lal Kitab Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
