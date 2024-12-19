<script>
    import quotes from '@App/data/quotes.js';
    import specialQuotes from '@App/data/specialQuotes.js';
    import { isSpecialDateToday } from '@App/stores/isSpecialDateToday.js';
    import { onMount } from 'svelte';

    export let style = '';

    let quote = '';
    onMount(() => {
        quote = randomQuote();
    });

    function randomQuote() {
        const quoteIndex = $isSpecialDateToday ? getRandomQuoteIndex(specialQuotes.length) : getRandomQuoteIndex(quotes.length);
        const quote = $isSpecialDateToday ? specialQuotes[quoteIndex] : quotes[quoteIndex];
        return quote;
    }

    function getRandomQuoteIndex(max) {
        return Math.floor(Math.random() * max);
    }
</script>

<span class={style}>{quote}</span>
