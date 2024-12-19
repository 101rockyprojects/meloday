<script>
    import Quote from '@App/components/Quote.svelte';
    import { capitalizeFirstLetter } from '@App/functions/format.js';

    export let videoTitle = '';
    export let videoId = '';
    export let autoplay = '';
</script>

<h3 class="w-full text-lg md:text-2xl lg:text-3xl min-h-fit pb-6 opacity-85">{capitalizeFirstLetter(videoTitle)}</h3>
<div class="flex flex-col xl:flex-row w-full gap-4 bg-transparent">
    <div id="video" class="flex justify-center items-center w-full xl:w-[63%] 2xl:w-[55%]">
    <iframe
        id="video-player"
        title="Daily video player"
        src="https://www.youtube.com/embed/{videoId}{autoplay}"
        class="dinamyc-height w-full sm:w-[475px] md:w-[520px] lg:w-[550px] xl:w-[600px] 2xl:w-[700px] border-none"
        frameborder='0'
        scrolling='no'
        allowfullscreen
    ></iframe>
    </div>
    <div class="flex flex-col justify-center w-full xl:w-[37%] 2xl:w-[45%]">
    <hr class="h-[5px] my-2 border-1 border-opacity-30 block xl:hidden opacity-20 transition-all duration-500 ease-in-out">
    <Quote style="shadows text-lg md:text-xl lg:text-[1.4rem] pt-4 pb-6 xl:py-0 opacity-70" />
    <hr class="h-[5px] my-8 border-1 border-opacity-30 hidden xl:block opacity-20 transition-all duration-500 ease-in-out">
    <a class="flex justify-center items-center" href="https://youtube.com/watch?v={videoId}" target="_blank">
        <button class="btn flex justify-center items-center gap-3 text-amoure hover:border-amoure z-10">
        <img src="/images/youtube.png" class="w-6 h-6 md:w-8 md:h-8" alt="youtube-icon">
        <span class="text">Ver en Youtube</span>
        </button>
    </a>
    </div>
</div>


<style>
    .dinamyc-height {
        height: clamp(calc(120px + 8vw), calc(120px + 6em + 12vw), calc(150px + 3em + 9vw));
        clip-path: inset(0 2px 0 2px);
    }
</style>
