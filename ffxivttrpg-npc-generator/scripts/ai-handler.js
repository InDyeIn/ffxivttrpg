import { createActorFromData } from "./actor-creator.js";

const SYSTEM_PROMPT = `
You are an expert Game Master for the Final Fantasy XIV TTRPG. 
Your task is to generate complete, balanced stats for a non-player character (NPC) or monster based on a description or image provided by the user.

Output the result STRICTLY as a JSON object matching the following structure. Do not include markdown formatting like \`\`\`json in the output. Just the raw JSON object.

Structure:
{
  "name": "Name of the NPC",
  "level": 1, // Integer
  "description": "A brief background or flavor text.",
  "attributes": {
    "str": 10, // Primary: Strength
    "dex": 10, // Primary: Dexterity
    "vit": 10, // Primary: Vitality
    "int": 10, // Primary: Intelligence
    "mnd": 10  // Primary: Mind
  },
  "secondary": {
    "maxHp": 100,
    "maxMp": 0, // 0 if not needed
    "defense": 12,
    "magicDefense": 10,
    "vigilance": 14,
    "speed": 6
  }
}

Rules for balancing:
- A level 1 NPC usually has primary stats around 10-14.
- Max HP scales significantly with level and vitality.
- NPCs typically don't use MP unless they are heavy spellcasters.
- Defense and Magic Defense hover around 10-20 at lower levels.
Be creative but fair. Return ONLY valid JSON.
`;

export async function generateNpcWithAi(promptText, imageUrl) {
    const apiKey = game.settings.get("ffxivttrpg-npc-generator", "openaiApiKey");
    const model = game.settings.get("ffxivttrpg-npc-generator", "aiModel") || "gpt-4o-mini";

    if (!apiKey) throw new Error("No API key provided.");

    const messages = [
        { role: "system", content: SYSTEM_PROMPT }
    ];

    let userContent = [];
    if (promptText) {
        userContent.push({ type: "text", text: promptText });
    }
    if (imageUrl) {
        userContent.push({
            type: "image_url",
            image_url: { url: imageUrl }
        });
    }

    messages.push({ role: "user", content: userContent });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const errortext = await response.text();
        throw new Error(`OpenAI API Error: ${response.status} - ${errortext}`);
    }

    const data = await response.json();
    let responseText = data.choices[0].message.content.trim();

    // Clean up potential markdown JSON wrapping
    if (responseText.startsWith("```json")) responseText = responseText.replace("```json", "");
    if (responseText.startsWith("```")) responseText = responseText.replace("```", "");
    if (responseText.endsWith("```")) responseText = responseText.substring(0, responseText.length - 3).trim();

    try {
        const npcData = JSON.parse(responseText);
        await createActorFromData(npcData);
    } catch (e) {
        console.error("Failed to parse AI response as JSON:", responseText);
        throw new Error("AI returned invalid JSON format.");
    }
}
