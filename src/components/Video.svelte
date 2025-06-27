<script>
    import '@justinribeiro/lite-youtube';
    import Quote from '@App/components/Quote.svelte';
    import { capitalizeFirstLetter } from '@App/functions/format.js';

    export let videoTitle = '';
    videoTitle = capitalizeFirstLetter(videoTitle);
    export let videoId = '';
</script>

<h3 class="w-full text-lg md:text-2xl lg:text-3xl min-h-fit pb-6 opacity-85">{videoTitle}</h3>
<div class="flex flex-col lg:flex-row w-full gap-4 bg-transparent">
    <div id="video" class="flex justify-center items-center w-full lg:w-[65%] aspect-video">
        <lite-youtube videoid="{videoId}"
            id="video-player"
            title="{videoTitle}"
            class="w-full h-[99.5%] max-w-[700px] border-none"
        ></lite-youtube>
    </div>
    <div class="flex flex-col justify-center w-full lg:w-[35%]">
        <hr class="h-[5px] my-2 border-1 border-opacity-30 block lg:hidden opacity-20 transition-all duration-500 ease-in-out">
        <Quote style="shadows text-lg md:text-xl lg:text-[1.4rem] pt-4 pb-6 lg:py-0 opacity-70" />
        <hr class="h-[5px] my-8 border-1 border-opacity-30 hidden lg:block opacity-20 transition-all duration-500 ease-in-out">
        <a class="flex justify-center items-center" href="https://youtube.com/watch?v={videoId}" target="_blank">
            <button class="btn flex justify-center items-center gap-3 text-amoure hover:border-amoure z-10">
                <img src="./images/youtube.png" class="w-6 h-6 md:w-8 md:h-8" alt="youtube-icon">
                <span class="text">Ver en Youtube</span>
            </button>
        </a>
    </div>
</div>