<script>
    import { onMount } from 'svelte';

    export let style = '';
    export let stylePreStaticText = '';
    export let styleAnimatedText = '';
    export let stylePostStaticText = '';
    export let preStaticText = '';
    export let animatedWords = ['opcion1', 'opcion2'];
    export let postStaticText = '';
    export let replacingDelay = 1000;
    export let typeDelay = 500;

    let title = '';
    let index = 0;

    function updateText() {
        const word = animatedWords[index];
        let newText = '';
        let charIndex = 0;

        const typingInterval = setInterval(() => {
            if (charIndex < word.length) {
                newText += word[charIndex];
                title = newText;
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    const deletingInterval = setInterval(() => {
                        if (newText.length > 0) {
                            newText = newText.slice(0, -1);
                            title = newText;
                        } else {
                            clearInterval(deletingInterval);
                            setTimeout(() => {
                                index = (index + 1) % animatedWords.length;
                                updateText();
                            }, Number(typeDelay));
                        }
                    }, randomTypingTime() + 50);
                }, Number(replacingDelay));
            }
        }, randomTypingTime() + 100);
    }

    function randomTypingTime() {
        return (Math.floor(Math.random() * 2) + 1) * 50;
    }

    onMount(() => {
        updateText();
    });
</script>

<h1 class="title {style}">
    <span class={stylePreStaticText}>{preStaticText}</span>
    <span class="animated {styleAnimatedText}">{title}</span>
    <span class={stylePostStaticText}>{postStaticText}</span>
</h1>

<style>
    .title {
        line-height: 1.2;
        display: inline-block;
        white-space: nowrap;
        @apply text-[2.5rem] sm:text-[3.25rem] md:text-[3.5rem] lg:text-[3.75rem] xl:text-[3.85rem]
    }
    .title span {
        margin: 0;
        padding: 0;
    }
    .animated::after {
        content: '|';
        animation: blink 0.8s infinite;
        font-weight: 100;
    }

    @keyframes blink {
        0% { opacity: 1; }
        25% { opacity: 0; }
        50% { opacity: 0; }
        100% { opacity: 1; }
    }
</style>
