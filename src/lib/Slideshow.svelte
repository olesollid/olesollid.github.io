<script lang="ts">
  let { images, label }: { images: { src: string; alt: string }[]; label: string } = $props();

  let index = $state(0);
  let root: HTMLDivElement;
  let startX = 0;
  let dragging = $state(false);
  let dragX = $state(0);
  let lastWheel = 0;

  // Preload all images
  $effect(() => {
    for (const { src } of images) {
      if (!src) continue;
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    }
  });

  const go = (i: number) => (index = (i + images.length) % images.length);

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  }

  // Make images draggable.
  function onPointerDown(e: PointerEvent) {
    if (images.length < 2 || (e.target as HTMLElement).closest('button')) return;
    startX = e.clientX;
    dragging = true;
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 6) root.setPointerCapture(e.pointerId);
    // Loop at first/last image.
    const atEdge = (index === 0 && dx > 0) || (index === images.length - 1 && dx < 0);
    dragX = atEdge ? dx * 0.3 : dx;
  }
  function endDrag(e: PointerEvent, cancelled = false) {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - startX;
    dragX = 0;
    if (!cancelled && Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  }

  // Sideways scroll
  $effect(() => {
    const onWheel = (e: WheelEvent) => {
      if (images.length < 2 || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const now = performance.now();
      if (Math.abs(e.deltaX) < 8 || now - lastWheel < 450) return;
      lastWheel = now;
      go(index + (e.deltaX > 0 ? 1 : -1));
    };
    root.addEventListener('wheel', onWheel, { passive: false });
    return () => root.removeEventListener('wheel', onWheel);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
  class="slideshow"
  role="group"
  aria-roledescription="carousel"
  aria-label="{label} screenshots"
  tabindex="0"
  bind:this={root}
  onkeydown={onKey}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={endDrag}
  onpointercancel={(e) => endDrag(e, true)}
>
  <div class="frame">
    <div
      class="track"
      class:dragging
      style="transform: translateX(calc({-index * 100}% + {dragX}px))"
    >
      {#each images as image, i}
        <div class="slide" aria-hidden={i !== index}>
          {#if image.src}
            <img src={image.src} alt={image.alt} draggable="false" />
          {:else}
            <div class="placeholder">Pictures coming soon</div>
          {/if}
        </div>
      {/each}
    </div>
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
    touch-action: pan-y;
    user-select: none;
    cursor: grab;
  }
  .frame { position: relative; aspect-ratio: 16 / 10; overflow: hidden; }
  .track {
    display: flex;
    height: 100%;
    transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .track.dragging { transition: none; }
  .slide { position: relative; flex: 0 0 100%; height: 100%; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  @media (prefers-reduced-motion: reduce) { .track { transition: none; } }

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
