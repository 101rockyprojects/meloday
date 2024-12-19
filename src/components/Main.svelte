<script>
  import TypedAnimatedTitle from '@App/components/TypedAnimatedTitle.svelte';
  import TodayDate from '@App/components/TodayDate.svelte';
  import VideoPlayer from '@App/components/VideoPlayer.svelte';
  import { isLeapYear } from '@App/functions/dates.js';
  
  const numberOfDays = isLeapYear() ? '366' : '365';
  const animatedWords = [
    'Meloday', 'A melody each day', 'Dedicated to you',
    'Melodía', 'Una melodía cada día', 'Te la dedico'
  ];
</script>

<main>
    <div style="absolute top-0 w-[80%] text-center flex flex-col items-center">
        <TypedAnimatedTitle {animatedWords} 
            replacingDelay={3500}
            typeDelay={1000}
            style="text-5xl md:text-[3.5rem] lg:text-[4.5rem]"
            styleAnimatedText="from-amoure via-gummy to-blue-berry bg-gradient-to-r text-transparent bg-clip-text"/>
        <div class="readex-thin text-ceilGray opacity-30 text-base md:text-md lg:text-lg">
            <TodayDate />
            ({numberOfDays} días)
        </div>
    </div>
    <VideoPlayer />
    <footer class="flex justify-center items-center m-2 bottom-0 text-sm z-5 readex-thin relative">
        <a href="https://github.com/101rockyprojects" target="_blank" class="flex items-center justify-center gap-2 text-white opacity-50 hover:opacity-100 no-underline">
            by
            <img class="w-6" src="/images/github.png" alt="GitHub icon">
            101rockyprojects
        </a>
    </footer>
</main>

<style>
    main {
        font-family: 'Readex Pro';
        src: url('/public/fonts/ReadexPro-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
        min-width: 80dvw;
    }
</style>
