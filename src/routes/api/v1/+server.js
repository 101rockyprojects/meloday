import { json } from '@sveltejs/kit';
import { playlistId, apiKey, specialDates } from '@App/lib/data/variables.js';
import { getDayNumber, parseDate, isSpecialDate, isLeapYear } from '@App/lib/functions/dates.js';
import { getTodayVideo } from '@App/lib/functions/api.js';
import quotes from '@App/lib/data/quotes.js';
import specialQuotes from '@App/lib/data/specialQuotes.js';

export async function GET({ url }) {
    try {
        const dayParam = url.searchParams.get('day');
        const today = new Date();
        let targetDate = today;
        let dayNumber = getDayNumber(today);
        let isSpecial = false;

        if (dayParam) {
            const parsed = parseDate(dayParam);
            if (parsed) {
                targetDate = parsed;
                dayNumber = getDayNumber(parsed);
            } else {
                return json({ error: 'Formato de fecha inválido. Usa DD-MM' }, { status: 400 });
            }
        }

        isSpecial = isSpecialDate(today, specialDates, dayParam ? dayNumber : null);

        console.log('Fetching video for day:', dayNumber);
        
        const video = await getTodayVideo(playlistId, apiKey, dayNumber);
        
        if (!video) {
            console.error('No video found for day:', dayNumber);
            return json({ error: 'Video no encontrado' }, { status: 404 });
        }

        const videoId = video.snippet?.resourceId?.videoId || video.id;
        const videoTitle = video.snippet?.title;
        const maxTitleLength = 52;
        const name = videoTitle.length > maxTitleLength 
            ? videoTitle.slice(0, maxTitleLength - 3) + '...' 
            : videoTitle;

        const baseUrl = 'https://101rockyprojects.github.io/meloday';
        const embed = `<lite-youtube videoid="${videoId}" class="meloday-video"></lite-youtube>`;
        
        const dateFormatted = new Intl.DateTimeFormat('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(targetDate);
        
        const randomQuote = isSpecial 
            ? specialQuotes[Math.floor(Math.random() * specialQuotes.length)]
            : quotes[Math.floor(Math.random() * quotes.length)];

        return json({
            name,
            videoId,
            embed,
            defaultLink: `/?v=${videoId}`,
            links: {
                query: `/?v=${videoId}`,
                watchQuery: `/watch?v=${videoId}`,
                watchSegment: `/watch/${videoId}`,
                short: `/${videoId}`,
                byDay: dayParam ? `/?day=${dayParam}` : null
            },
            date: {
                raw: dayParam || null,
                parsed: dateFormatted,
                dayOfYear: Math.floor(dayNumber),
                isLeapYear: isLeapYear()
            },
            quote: randomQuote,
            isSpecialDate: isSpecial
        });
    } catch (error) {
        console.error('API Error Details:', error.message);
        console.error('Stack trace:', error.stack);
        
        return json({ 
            error: 'Error getting video',
            details: error.message 
        }, { status: 500 });
    }
}
