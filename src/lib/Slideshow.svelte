<script lang="ts">
  import { fade } from 'svelte/transition';

  let { images, label }: { images: { src: string; alt: string }[]; label: string } = $props();

  let index = $state(0);
  let startX = 0;

  const go = (i: number) => (index = (i + images.length) % images.length);

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  }
  function onTouchEnd(e: TouchEvent) {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="slideshow"
  role="group"
  aria-roledescription="carousel"
  aria-label="{label} screenshots"
  tabindex="0"
  onkeydown={onKey}
  ontouchstart={(e) => (startX = e.touches[0].clientX)}
  ontouchend={onTouchEnd}
>
  <div class="frame">
    {#key index}
      {#if images[index].src}
        <img
          src={images[index].src}
          alt={images[index].alt}
          in:fade={{ duration: 350 }}
          out:fade={{ duration: 350 }}
          draggable="false"
        />
      {:else}
        <div class="placeholder">Pictures coming soon</div>
      {/if}
    {/key}
  </div>

  {#if images.length > 1}
    <div class="controls">
    <button class="nav prev" onclick={() => go(index - 1)} aria-label="Previous image">‹</button>
    <div class="dots">
      {#each images as _, i}
        <button
          class:active={i === index}
          onclick={() => go(i)}
          aria-label="Show image {i + 1} of {images.length}"
          aria-current={i === index}
        ></button>
      {/each}
    </div>
    <button class="nav next" onclick={() => go(index + 1)} aria-label="Next image">›</button>
    </div>
  {/if}
</div>

<style>
  .slideshow {
    position: relative;
    border-radius: var(--radius);
    overflow: hidden;
    background: var(--bg-soft);
    border: 1px solid var(--border);
    box-shadow: 0 20px 40px -24px rgb(0 0 0 / 0.35);
  }
  .frame { position: relative; aspect-ratio: 16 / 10; }
  img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

  .controls {
    position: absolute;
    bottom: 0.75rem;
    left: 50%;
    translate: -50% 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: var(--muted);
    font-size: 1.1rem;
  }
  .nav {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 0;
    background: rgb(255 255 255 / 0.85);
    color: #111;
    font-size: 1.3rem;
    line-height: 1;
    cursor: pointer;
    transition: transform 0.2s;
    backdrop-filter: blur(6px);
  }
  .nav:hover { transform: scale(1.08); }

  .dots {
    display: flex;
    gap: 0.4rem;
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    background: rgb(0 0 0 / 0.35);
    backdrop-filter: blur(6px);
  }
  .dots button {
    width: 0.5rem;
    height: 0.5rem;
    padding: 0;
    border: 0;
    border-radius: 999px;
    background: rgb(255 255 255 / 0.5);
    cursor: pointer;
    transition: width 0.25s, background 0.25s;
  }
  .dots button.active { width: 1.4rem; background: #fff; }
</style>
