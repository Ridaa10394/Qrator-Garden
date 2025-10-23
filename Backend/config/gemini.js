import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is available at runtime. dotenv should be configured
// before this module is imported (see Backend/index.js).
const getGeminiClient = () => {
    // This code runs ONLY when a route controller calls one of the exported functions.
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        // Provide a clearer error if the key is still missing
        throw new Error("GEMINI_API_KEY is not available. Check dotenv setup in index.js and .env file.");
    }
    
    return new GoogleGenerativeAI(apiKey);
};

// Generate Ideas using Gemini
export const generateIdeasWithGemini = async (topic, audience) => {
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `You are a creative content strategist. Generate exactly 3 unique and engaging content ideas for the topic: "${topic}"${audience ? ` targeting ${audience}` : ''}.

For each idea, provide:
1. A catchy title (put it in quotes)
2. A brief description explaining the concept

Format each idea as:
Title: "Your Title Here"
Description: Your description here

Make the ideas diverse, actionable, and specifically tailored to content creators.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the response into structured ideas
        const ideas = parseIdeasFromText(text);
        
        return ideas;
    } catch (error) {
        console.error("Error generating ideas with Gemini:", error);
        // Rethrow with the original error message so the controller can send it back for debugging
        throw new Error(error?.message || "Failed to generate ideas");
    }
};

// Generate Script using Gemini
export const generateScriptWithGemini = async (title, contentType, duration, keyPoints) => {
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const keyPointsText = keyPoints && keyPoints.length > 0 
            ? `\n\nKey points to cover:\n${keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}`
            : '';
        
        const prompt = `You are a professional scriptwriter for ${contentType} content. Create a detailed, engaging script for: "${title}"

Target duration: ${duration} minutes
Content type: ${contentType}${keyPointsText}

Please structure the script with:
1. Introduction (Hook the audience)
2. Main Content (Detailed breakdown with timestamps)
3. Conclusion (Call-to-action and summary)
4. Production notes

Make it engaging, conversational, and optimized for ${contentType}. Include specific timestamps based on the ${duration}-minute duration.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return text;
    } catch (error) {
        console.error("Error generating script with Gemini:", error);
        throw new Error(error?.message || "Failed to generate script");
    }
};

// Generate SEO content using Gemini
export const generateSEOWithGemini = async (contentTitle, platform, targetKeywords, contentDescription) => {
    try {
        const genAI = getGeminiClient();
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const prompt = `You are an SEO expert specializing in ${platform} content optimization. Create comprehensive SEO content for: "${contentTitle}"

Platform: ${platform}
${targetKeywords ? `Target Keywords: ${targetKeywords}` : ''}
${contentDescription ? `Content Description: ${contentDescription}` : ''}

Provide the following in a structured format:

1. OPTIMIZED_TITLE: One highly optimized title for maximum reach
2. TITLE_ALTERNATIVES: 3 alternative title options
3. DESCRIPTION: A compelling 150-160 character meta description
4. PRIMARY_KEYWORDS: 5-7 primary keywords (comma-separated)
5. RELATED_KEYWORDS: 10 related keywords (comma-separated)
6. HASHTAGS: 8-10 relevant hashtags for ${platform} (space-separated, with # symbol)

Make all content optimized specifically for ${platform}'s algorithm and audience.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the SEO response
        const seoData = parseSEOFromText(text, contentTitle);
        
        return seoData;
    } catch (error) {
        console.error("Error generating SEO with Gemini:", error);
        throw new Error(error?.message || "Failed to generate SEO content");
    }
};

// Helper function to parse ideas from Gemini response
function parseIdeasFromText(text) {
    const ideas = [];
    const lines = text.split('\n');
    let currentIdea = { title: '', description: '' };
    
    for (let line of lines) {
        line = line.trim();
        
        // Match title patterns
        if (line.match(/^(Title|Idea \d+):/i)) {
            if (currentIdea.title && currentIdea.description) {
                ideas.push(currentIdea);
                currentIdea = { title: '', description: '' };
            }
            // Extract title from quotes or after colon
            const titleMatch = line.match(/"([^"]+)"/);
            if (titleMatch) {
                currentIdea.title = titleMatch[1];
            } else {
                currentIdea.title = line.replace(/^(Title|Idea \d+):\s*/i, '');
            }
        }
        // Match description patterns
        else if (line.match(/^Description:/i)) {
            currentIdea.description = line.replace(/^Description:\s*/i, '');
        }
        // Continue description on next lines
        else if (currentIdea.title && line && !line.match(/^(Title|Idea \d+):/i)) {
            if (currentIdea.description) {
                currentIdea.description += ' ' + line;
            } else {
                currentIdea.description = line;
            }
        }
    }
    
    // Add the last idea
    if (currentIdea.title && currentIdea.description) {
        ideas.push(currentIdea);
    }
    
    // If parsing failed, create fallback structure
    if (ideas.length === 0) {
        const sections = text.split(/\d+\./);
        sections.slice(1, 6).forEach((section) => {
            const titleMatch = section.match(/"([^"]+)"/);
            if (titleMatch) {
                ideas.push({
                    title: titleMatch[1],
                    description: section.replace(/"[^"]+"/g, '').trim()
                });
            }
        });
    }
    
    return ideas.slice(0, 3); // Ensure we return exactly 5 ideas
}

// Helper function to parse SEO data from Gemini response
function parseSEOFromText(text, originalTitle) {
    const seoData = {
        optimizedTitle: originalTitle,
        titleAlternatives: [],
        description: '',
        primaryKeywords: [],
        relatedKeywords: [],
        hashtags: []
    };
    
    const lines = text.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        
        if (line.match(/OPTIMIZED_TITLE:/i)) {
            seoData.optimizedTitle = line.replace(/OPTIMIZED_TITLE:\s*/i, '').replace(/"/g, '');
        }
        else if (line.match(/TITLE_ALTERNATIVES:/i)) {
            const alts = line.replace(/TITLE_ALTERNATIVES:\s*/i, '');
            seoData.titleAlternatives = alts.split(/[,\n]/).map(t => t.trim().replace(/^\d+\.\s*/, '').replace(/"/g, '')).filter(t => t);
        }
        else if (line.match(/DESCRIPTION:/i)) {
            seoData.description = line.replace(/DESCRIPTION:\s*/i, '').replace(/"/g, '');
        }
        else if (line.match(/PRIMARY_KEYWORDS:/i)) {
            const keywords = line.replace(/PRIMARY_KEYWORDS:\s*/i, '');
            seoData.primaryKeywords = keywords.split(',').map(k => k.trim()).filter(k => k);
        }
        else if (line.match(/RELATED_KEYWORDS:/i)) {
            const keywords = line.replace(/RELATED_KEYWORDS:\s*/i, '');
            seoData.relatedKeywords = keywords.split(',').map(k => k.trim()).filter(k => k);
        }
        else if (line.match(/HASHTAGS:/i)) {
            const tags = line.replace(/HASHTAGS:\s*/i, '');
            seoData.hashtags = tags.split(/[\s,]+/).map(h => {
                h = h.trim();
                return h.startsWith('#') ? h : `#${h}`;
            }).filter(h => h !== '#');
        }
    }
    
    // Fallback to ensure we have data
    if (!seoData.description) {
        seoData.description = `Discover everything about ${originalTitle}. Learn tips, tricks, and best practices.`;
    }
    
    return seoData;
}

export default { generateIdeasWithGemini, generateScriptWithGemini, generateSEOWithGemini };