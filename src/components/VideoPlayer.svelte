<script>
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import Confetti from '@App/components/Confetti.svelte';
    import Oops from '@App/components/Oops.svelte';
    import Video from '@App/components/Video.svelte';
    import { todayNumber } from '@App/stores/todayNumber.js';
    import { playlistId, apiKey, specialDates } from '@App/data/variables.js';
    import { getTodayVideo, getVideoById, getParameterByName} from '@App/functions/api';
    import { parseDate, getDayNumber, isSpecialDate } from '@App/functions/dates.js';
    import { isSpecialDateToday } from '@App/stores/isSpecialDateToday.js';
    
    let video;
    let videoTitle = '';
    let videoId = '';
    let isLoading = true;
    let showVideo = false;

    onMount(() => {
      initialize();
    });

    async function initialize() {
      const today = new Date();
      todayNumber.set(getDayNumber(today));
      let isSpecialToday = isSpecialDate(today, specialDates);

      const videoIdParam = getParameterByName('v') || getParameterByName('song');
      const dayParam = getParameterByName('day');

      try {
        if (videoIdParam) {
          video = await getVideoById(videoIdParam, apiKey);
          if (!video) {
            console.error("Invalid request, video not found for 'song' parameter.");
          }
        } else if (dayParam) {
          const dayDate = parseDate(dayParam);
          if (dayDate !== null) {
            const dayNumber = getDayNumber(dayDate);
            todayNumber.set(Math.abs(Number(dayNumber)));
            isSpecialToday = isSpecialDate(today, specialDates, dayNumber);
          }
        }
        if (!video) {
          video = await getTodayVideo(playlistId, apiKey);
        }
        isSpecialDateToday.set(isSpecialToday);
      } catch (error) {
        isLoading = false;
        showVideo = false;
      }
      loadVideo(video);
    }

    function loadVideo(video) {
      if (!video) {
        isLoading = false;
      }
      const maxTitleLength = 52;
      videoTitle = video.snippet.title.length > maxTitleLength ? 
                   video.snippet.title.slice(0, maxTitleLength - 3) + '...' : 
                   video.snippet.title;
      videoId = video.snippet.resourceId ? video.snippet.resourceId.videoId : video.id;
      isLoading = false;
      showVideo = true;
    }
</script>

{#if $isSpecialDateToday}
    <Confetti />
{/if}
<div class="card">
    <div id="video-info" class="flex flex-col w-full p-6 lg:p-8">
        {#if isLoading}
            <div class="loading">
              {#each Array(5) as _}
                <span></span>
              {/each}
            </div>
        {:else if showVideo && !isLoading}
            <Video {videoTitle} {videoId}/>
        {:else}
              <Oops title="Oops," msg="No se encontro el video, pudo haber sido borrado o se encuentra privado." />
        {/if}
    </div>
</div>
  
<style>
  .card:hover {
    box-shadow: 0px 0px 30px 1px rgba(204, 46, 244, 0.3);
  }:hover #video-info {
    transform: scale(0.98);
  }
  #video-info {
    align-items: center;
    justify-content: center;
    border-radius: 1em;
    box-shadow: 0 5px rgba(0, 0, 0, 0.1);
    transition: all .2s;
    max-width: 100%;
    width: 85dvw;
    min-height: 60dvh;
    @apply bg-ceil-gray
  }
  .loading span {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin: 0 3px;
    animation: scale 1s ease-in-out infinite;
  }
  .loading span {
      width: 4px;
      height: 50px;
      animation: scale 0.8 ease-in-out infinite;
      @apply bg-blue-berry;
  }  
  .loading span:nth-child(2) {
    animation-delay: -0.8s;
    @apply bg-amoure
  } 
  .loading span:nth-child(3) {
    animation-delay: -0.7s;
    @apply bg-gummy
  }  
  .loading span:nth-child(4) {
    animation-delay: -0.6s;
    @apply bg-amoure
  }
  .loading span:nth-child(5) {
    animation-delay: -0.5s;
    @apply bg-blue-berry
  }
  @keyframes scale {
      0%, 40%, 100% {
      transform: scaleY(0.05);
      }
      20% {
      transform: scaleY(1);
      }
  }
</style>
