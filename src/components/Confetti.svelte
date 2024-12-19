<div class="absolute h-screen inset-0 flex justify-center items-center overflow-hidden">
    {#each Array(20) as _}
      <div class="confetti-piece animate-rain"></div>
    {/each}
</div>

<style>
  .confetti-piece {
    position: absolute;
    width: 10px;
    height: 30px;
    top: 0;
    opacity: 0;
    animation: makeItRain 3000ms infinite linear;
  }

  .confetti-piece:nth-child(1) {
    left: 7%;
    transform: rotate(-10deg);
    animation-delay: 182ms;
    animation-duration: 2000ms;
  }

  .confetti-piece:nth-child(2) {
    left: 14%;
    transform: rotate(20deg);
    animation-delay: 161ms;
    animation-duration: 2076ms;
  }

  .confetti-piece:nth-child(3) {
    left: 21%;
    transform: rotate(-51deg);
    animation-delay: 481ms;
    animation-duration: 2103ms;
  }

  .confetti-piece:nth-child(4) {
    left: 28%;
    transform: rotate(61deg);
    animation-delay: 334ms;
    animation-duration: 1508ms;
  }

  .confetti-piece:nth-child(5) {
    left: 35%;
    transform: rotate(-52deg);
    animation-delay: 302ms;
    animation-duration: 1076ms;
  }

  .confetti-piece:nth-child(6) {
    left: 42%;
    transform: rotate(38deg);
    animation-delay: 180ms;
    animation-duration: 1168ms;
  }

  .confetti-piece:nth-child(7) {
    left: 49%;
    transform: rotate(110deg);
    animation-delay: 395ms;
    animation-duration: 3200ms;
  }

  .confetti-piece:nth-child(8) {
    left: 56%;
    transform: rotate(49deg);
    animation-delay: 14ms;
    animation-duration: 1887ms;
  }

  .confetti-piece:nth-child(9) {
    left: 63%;
    transform: rotate(-72deg);
    animation-delay: 149ms;
    animation-duration: 1805ms;
  }

  .confetti-piece:nth-child(10) {
    left: 70%;
    transform: rotate(10deg);
    animation-delay: 351ms;
    animation-duration: 2059ms;
  }

  .confetti-piece:nth-child(11) {
    left: 77%;
    transform: rotate(4deg);
    animation-delay: 307ms;
    animation-duration: 1132ms;
  }

  .confetti-piece:nth-child(12) {
    left: 84%;
    transform: rotate(42deg);
    animation-delay: 464ms;
    animation-duration: 1776ms;
  }

  .confetti-piece:nth-child(13) {
    left: 89%;
    transform: rotate(-72deg);
    animation-delay: 49ms;
    animation-duration: 1611ms;
  }

  .confetti-piece:nth-child(14) {
    left: 94%;
    transform: rotate(-90deg);
    animation-delay: 239ms;
    animation-duration: 1418ms;
  }

  .confetti-piece:nth-child(15) {
    left: 46%;
    transform: rotate(32deg);
    animation-delay: 789ms;
    animation-duration: 3418ms;
  }

  .confetti-piece:nth-child(16) {
    left: 98%;
    transform: rotate(-12deg);
    animation-delay: 389ms;
    animation-duration: 2818ms;
  }

  .confetti-piece:nth-child(17) {
    left: 50%;
    transform: rotate(-129deg);
    animation-delay: 429ms;
    animation-duration: 1238ms;
  }

  .confetti-piece:nth-child(18) {
    left: 60%;
    transform: rotate(61deg);
    animation-delay: 797ms;
    animation-duration: 3729ms;
  }

  .confetti-piece:nth-child(19) {
    left: 10%;
    transform: rotate(61deg);
    animation-delay: 189ms;
    animation-duration: 3289ms;
  }

  .confetti-piece:nth-child(20) {
    left: 4%;
    transform: rotate(61deg);
    animation-delay: 429ms;
    animation-duration: 2818ms;
  }

  .confetti-piece:nth-child(odd) {
    @apply bg-amoure;
  }

  .confetti-piece:nth-child(even) {
    @apply bg-blue-berry;
  }

  .confetti-piece:nth-child(3n) {
    width: 5px;
    height: 12px;
    @apply bg-coral;
  }

  .confetti-piece:nth-child(4n) {
    width: 7px;
    height: 15px;
    @apply bg-gummy;
  }

  .confetti-piece:nth-child(5n) {
    width: 3px;
    height: 7px;
    @apply bg-white;
  }
</style>
