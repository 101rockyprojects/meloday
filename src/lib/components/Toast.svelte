<script>
    import { onMount } from 'svelte';

    export let message = 'Lo siento, no encontramos tu canción :(';
    export let visible = false;
    export let duration = 5000;

    let timeoutId;

    export function show() {
        visible = true;
        if (timeoutId) clearTimeout(timeoutId);
        if (duration > 0) {
            timeoutId = setTimeout(() => {
                visible = false;
            }, duration);
        }
    }

    export function hide() {
        visible = false;
        if (timeoutId) clearTimeout(timeoutId);
    }

    onMount(() => {
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    });
</script>

{#if visible}
    <div 
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 
               bg-ceil-gray/90 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-lg sm:rounded-xl
               border-l-4 border-amoure flex items-center gap-2 sm:gap-3
               shadow-lg max-w-[90dvw] sm:max-w-md"
        role="alert"
        aria-live="polite"
    >
        <span class="text-sm sm:text-base font-readex">{message}</span>
        <button 
            on:click={hide}
            class="ml-2 p-1 bg-transparent hover:border-amoure rounded transition-colors"
            aria-label="Cerrar"
        >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white/70 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
{/if}

<style>
    .border-amoure {
        border-left-color: #EC1A1A;
    }
    .font-readex {
        font-family: 'Readex Pro', sans-serif;
    }
</style>
