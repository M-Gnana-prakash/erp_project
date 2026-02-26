const express = require('express');
const cors = require('cors');
const gtts = require('node-gtts');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve generated audio files
const audioDir = path.join(__dirname, 'audio');
app.use('/audio', express.static(audioDir));

// Map full locale codes (e.g. en-US) to what node-gtts supports (e.g. en)
function mapLanguage(lang) {
    const langMap = {
        'en-US': 'en',
        'en-GB': 'en',
        'es-ES': 'es',
        'fr-FR': 'fr',
        'de-DE': 'de',
        'it-IT': 'it',
        'pt-BR': 'pt',
        'hi-IN': 'hi',
        'ja-JP': 'ja',
        'zh-CN': 'zh',
        'ko-KR': 'ko',
        'ar-SA': 'ar',
    };
    return langMap[lang] || lang.split('-')[0] || 'en';
}

// POST /api/tts.php — Convert text to speech and return audio URL
app.post('/api/tts.php', (req, res) => {
    const { text, language } = req.body;

    if (!text || !language) {
        return res.status(400).json({ error: 'Text and language are required' });
    }

    const mappedLang = mapLanguage(language);
    const fileName = `tts_${Date.now()}.mp3`;
    const filePath = path.join(audioDir, fileName);

    console.log(`\nGenerating TTS: "${text}" | Language: ${language} (${mappedLang})`);

    try {
        const tts = gtts(mappedLang);
        tts.save(filePath, text, (err) => {
            if (err) {
                console.error('TTS Error:', err);
                return res.status(500).json({ error: 'Failed to generate audio', details: err.message });
            }

            const audioUrl = `http://localhost:${PORT}/audio/${fileName}`;
            console.log(`Audio saved: ${audioUrl}`);

            return res.json({
                status: 'success',
                audioUrl: audioUrl
            });
        });
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`TTS Backend running at http://localhost:${PORT}`);
    console.log(`POST endpoint: http://localhost:${PORT}/api/tts.php`);
});
