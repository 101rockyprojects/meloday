<script>
    import quotes from '@App/lib/data/quotes.js';
    import specialQuotes from '@App/lib/data/specialQuotes.js';
    import { isSpecialDateToday } from '@App/lib/stores/isSpecialDateToday.js';
    import { onMount } from 'svelte';

    export let style = '';

    let quote = '';
    onMount(() => {
        quote = randomQuote();
    });

    function randomQuote() {
        const quoteIndex = $isSpecialDateToday ? getRandomQuoteIndex(specialQuotes.length) : getRandomQuoteIndex(quotes.length);
        const quoteList = $isSpecialDateToday ? specialQuotes : quotes;
        return quoteList[quoteIndex];
    }

    function getRandomQuoteIndex(max) {
        return Math.floor(Math.random() * max);
    }
</script>

<span class="{style}">
    {quote}
</span>

<style>
    .font-shadows {
        font-family: 'Shadows Into Light', cursive;
        letter-spacing: 0.05em;
    }
</style>
