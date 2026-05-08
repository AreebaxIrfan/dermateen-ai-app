import { generateText, Output } from 'ai'
import { z } from 'zod'

const skinAnalysisSchema = z.object({
  severity: z.enum(['mild', 'moderate', 'severe']).describe('Overall acne severity level'),
  confidence: z.number().min(0).max(100).describe('Confidence percentage of the analysis'),
  acneTypes: z.array(z.string()).describe('Types of acne detected (e.g., Comedonal, Papular, Pustular, Cystic, Nodular)'),
  overallScore: z.number().min(0).max(100).describe('Overall skin health score from 0-100'),
  affectedAreas: z.array(z.string()).describe('Facial areas affected (e.g., forehead, cheeks, chin, nose)'),
  recommendations: z.object({
    skincare: z.array(z.string()).describe('Skincare product and routine recommendations'),
    diet: z.array(z.string()).describe('Dietary recommendations for better skin'),
    hydration: z.string().describe('Hydration recommendation'),
    sleep: z.string().describe('Sleep recommendation'),
    lifestyle: z.array(z.string()).describe('Lifestyle changes to improve skin health'),
  }),
  additionalNotes: z.string().nullable().describe('Any additional observations or notes about the skin condition'),
})

export type SkinAnalysisResult = z.infer<typeof skinAnalysisSchema>

export async function POST(req: Request) {
  try {
    const { image } = await req.json()

    if (!image) {
      return Response.json({ error: 'No image provided' }, { status: 400 })
    }

    // Extract base64 data from data URL
    const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/)
    if (!base64Match) {
      return Response.json({ error: 'Invalid image format' }, { status: 400 })
    }

    const mediaType = `image/${base64Match[1]}` as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
    const base64Data = base64Match[2]

    const { output } = await generateText({
      model: 'anthropic/claude-sonnet-4.6',
      output: Output.object({
        schema: skinAnalysisSchema,
      }),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are a dermatology AI assistant specialized in analyzing skin conditions, particularly acne in teenagers. 

Analyze this facial image and provide a detailed assessment of the skin condition. Focus on:

1. **Severity Level**: Classify the overall acne severity as mild, moderate, or severe
2. **Acne Types**: Identify specific types of acne present (Comedonal/blackheads/whiteheads, Papular/small red bumps, Pustular/pus-filled, Cystic/deep painful bumps, Nodular/hard lumps)
3. **Affected Areas**: Note which facial regions are affected
4. **Skin Health Score**: Rate overall skin health from 0-100
5. **Personalized Recommendations**: Provide actionable skincare, diet, hydration, sleep, and lifestyle advice tailored for teenagers

Be encouraging and supportive in tone while being medically accurate. Remember this is for educational purposes only and should not replace professional dermatological advice.

IMPORTANT: If the image does not show a face or skin, or if you cannot properly analyze it, still provide a response but note this in the additionalNotes field and provide general skincare advice.`,
            },
            {
              type: 'image',
              image: base64Data,
              mimeType: mediaType,
            },
          ],
        },
      ],
    })

    return Response.json({ result: output })
  } catch (error) {
    console.error('[v0] Skin analysis error:', error)
    return Response.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    )
  }
}
