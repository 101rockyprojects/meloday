<script>
    import Toast from '@App/lib/components/Toast.svelte';

    let youtubeInput = '';
    let melodayUrl = '';
    let copiedIndex = -1;
    let toast;
    let showResult = false;
    const defaultVideoId = 'dQw4w9WgXcQ';
    let videoId = defaultVideoId;

    const examples = [
        {
            type: 'Consulta',
            pattern: '/?v=',
            example: '/?v={videoId}',
            description: 'Ver canción específica'
        },
        {
            type: 'Antiguo',
            pattern: '/watch?v=',
            example: '/watch?v={videoId}',
            description: 'Estilo YouTube'
        },
        {
            type: 'Corto',
            pattern: '/watch/',
            example: '/watch/{videoId}',
            description: 'Segmento de URL'
        },
        {
            type: 'Directo',
            pattern: '/',
            example: '/{videoId}',
            description: 'URL directa'
        },
        {
            type: 'Por día',
            pattern: '/?day=',
            example: '/?day=28-05',
            description: 'Ver canción de fecha'
        }
    ];

    function extractVideoId(url) {
        if (!url) return '';
        const patterns = [
            /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        const shortIdMatch = url.match(/^([a-zA-Z0-9_-]{11})$/);
        if (shortIdMatch) return shortIdMatch[1];
        return '';
    }

    function getBaseUrl() {
        return typeof window !== 'undefined' ? window.location.origin + '/meloday' : '';
    }

    function convertYoutubeLink() {
        videoId = extractVideoId(youtubeInput);
        if (videoId) {
            melodayUrl = `${getBaseUrl()}/?v=${videoId}`;
            youtubeInput = melodayUrl;
            showResult = true;
        } else {
            melodayUrl = '';
            showResult = false;
            videoId = defaultVideoId;
        }
    }

    function copyToClipboard(text, index) {
        navigator.clipboard.writeText(text).then(() => {
            copiedIndex = index;
            setTimeout(() => {
                copiedIndex = -1;
            }, 2000);
        });
    }

    function copyInput() {
        if (melodayUrl) {
            navigator.clipboard.writeText(melodayUrl).then(() => {
                toast.show();
            });
        }
    }

    $: if (youtubeInput) {
        convertYoutubeLink();
    } else {
        melodayUrl = '';
        showResult = false;
    }
</script>

<section class="w-full max-w-2xl mx-auto mt-5 px-4 rounded-2xl mb-6">
    <h2 class="text-xl sm:text-2xl md:text-3xl readex-bold text-white/90 text-center mb-6">
        Convierte tu link de YouTube
    </h2>
    <div class="relative max-w-2xl mx-auto">
        <input 
            bind:value={youtubeInput}
            type="text"
            placeholder="Pega un link de YouTube aquí..."
            class="w-full h-14 sm:h-16 px-6 sm:px-8 rounded-full bg-gray text-sm md:text-base text-white font-readex border border-amoure/50 focus:outline-none focus:border-amoure transition-all duration-300 placeholder:text-white/40"
        />
        <button id="convert-btn"
            on:click={copyInput}
            disabled={!melodayUrl}
            class="absolute right-2 top-2 bottom-2 px-4 sm:px-6 text-sm sm:text-base bg-amoure text-white font-readex font-bold rounded-full hover:scale-105 hover:border-amoure active:scale-95 transition-transform duration-200 disabled:opacity-40 disabled:hover:scale-100"
        >
            {!melodayUrl ? 'Convertir' : 'Copiar'}
        </button>
    </div>
</section>

<section class="w-full md:max-w-5xl mx-auto px-8 md:px-4 mb-6">
    <div class="flex items-center justify-between mb-4">
        {#if showResult}
            <h3 class="text-base sm:text-xl font-readex font-bold text-white">Comparte tu link Meloday:</h3>
        {:else}
            <h3 class="text-base sm:text-xl font-readex font-bold text-white">Formatos disponibles:</h3>
        {/if}
        <span class="text-xs sm:text-sm text-gummy bg-gummy/10 px-3 py-1 rounded-full">
            ¡{examples.length} formatos diferentes!
        </span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {#each examples as ex, i}
            <div class="p-4 sm:p-5 rounded-xl bg-gray/30 border border-white/5 transition-all duration-300 hover:bg-gray/50 hover:border-gummy/20 group">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="sm:text-lg font-readex font-bold text-white text-start">{ex.type}</p>
                        <p class="text-xs sm:text-sm text-white/50 font-medium">{ex.description}</p>
                    </div>
                </div>
                <code class="flex justify-between items-center bg-gray p-2 rounded-lg text-gummy font-mono text-sm border border-white/10">
                    {ex.example.replace('{videoId}', videoId)}
                    <button 
                        on:click={() => copyToClipboard(getBaseUrl() + ex.example.replace('{videoId}', videoId), i)}
                        class="p-1 rounded-lg bg-white/5 text-white/50 hover:text-gummy hover:border-gummy transition-colors"
                        aria-label="Copiar"
                    >
                        {#if copiedIndex === i}
                            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        {:else}
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        {/if}
                    </button>
                </code>
            </div>
        {/each}
        
        <div class="relative overflow-hidden rounded-xl border border-gummy/20 bg-gummy/5 p-4 sm:p-5 flex flex-col justify-center items-center text-center min-h-[120px] sm:min-h-[140px]">
            <svg class="w-10 h-10 sm:w-12 sm:h-12 text-gummy mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p class="text-white font-readex font-bold text-lg">¡Comparte la magia!</p>
            <p class="text-white/70 text-sm font-medium">Envía música a esa <span class="font-bold text-gummy">persona especial</span> hoy.</p>
        </div>
    </div>
</section>

<section class="w-[80vw] min-w-[380px] md:w-full md:max-w-2xl mx-auto md:px-4 bg-gray/40 rounded-2xl p-6 sm:p-8 border border-white/10">
    <h3 class="text-lg sm:text-xl font-readex font-bold text-white mb-6 text-center">Guía Rápida</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div class="flex flex-col items-center text-center group">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-berry/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 sm:w-8 sm:h-8 text-blue-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            </div>
            <h4 class="text-base sm:text-lg font-readex font-bold text-white mb-1">Paso 1</h4>
            <p class="text-white/50 text-sm font-medium">Copia el link de YouTube de tu canción favorita.</p>
        </div>
            <div class="flex flex-col items-center text-center group">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-berry/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg class="w-7 h-7 sm:w-8 sm:h-8 text-blue-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h4 class="text-base sm:text-lg font-readex font-bold text-white mb-1">Paso 2</h4>
                <p class="text-white/50 text-sm font-medium">Pégalo en el conversor de arriba de esta página.</p>
        </div>
        <div class="flex flex-col items-center text-center group">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-berry/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7 sm:w-8 sm:h-8 text-blue-berry" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            </div>
            <h4 class="text-base sm:text-lg font-readex font-bold text-white mb-1">Paso 3</h4>
            <p class="text-white/50 text-sm font-medium">Elige el formato y compártelo con alguien especial.</p>
        </div>
    </div>
</section>

<Toast bind:this={toast} message="¡Link Meloday copiado!" duration={2000} />
