<script lang="ts">
  import type { ProjectVideo } from '../data/types';

  let { video }: { video: ProjectVideo } = $props();

  // reduced motion preference gets poster-image
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = $state(query.matches);
  let el: HTMLVideoElement;

  $effect(() => {
    const onChange = () => {
      reduceMotion = query.matches;
      if (reduceMotion) el.pause();
      else el.play().catch(() => {});
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  });
</script>

<div class="media video">
  <video
    bind:this={el}
    width="1600"
    height="1002"
    poster={video.poster}
    aria-label={video.alt}
    autoplay={!reduceMotion}
    controls={reduceMotion}
    preload={reduceMotion ? 'none' : 'auto'}
    muted
    loop
    playsinline
    disablepictureinpicture
  >
    <source src={video.webm} type={'video/webm; codecs="av01.0.09M.08"'} />
    <source src={video.mp4} type={'video/mp4; codecs="avc1.64002A"'} />
  </video>
</div>

<style>
  .video {
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    box-shadow: 0 20px 40px -24px rgb(0 0 0 / 0.35);
  }
  video {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1600 / 1002;
    object-fit: cover;
  }
</style>
