<script lang="ts">
  import { fly } from 'svelte/transition';
  import { profile } from '../data/profile';

  const links = [
    { href: '#top', label: 'Me' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Get in touch' },
  ];

  let menuOpen = $state(false);
  let headerEl: HTMLElement;

  function onWindowClick(e: MouseEvent) {
    if (menuOpen && !headerEl.contains(e.target as Node)) menuOpen = false;
  }

  let theme = $state<'dark' | 'light'>(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

  let timer: ReturnType<typeof setTimeout>;

  function applyTheme(next: 'dark' | 'light') {
    theme = next;
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return applyTheme(next); // reduced motion?? could never be me.

    // cross-fade a snapshot of the whole page so everything changes in sync
    if (document.startViewTransition) {
      document.startViewTransition(() => applyTheme(next));
      return;
    }

    // fallback for browsers without view transitions
    root.classList.add('theme-transition');
    clearTimeout(timer);
    timer = setTimeout(() => root.classList.remove('theme-transition'), 600);
    applyTheme(next);
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={(e) => e.key === 'Escape' && (menuOpen = false)} />

<header bind:this={headerEl}>
  <div class="container bar">
    <a class="brand" href="#top">{profile.name}</a>
    <div class="right">
      <nav class="desktop" aria-label="Sections">
        {#each links as link}<a href={link.href}>{link.label}</a>{/each}
      </nav>
      <button class="icon" onclick={toggle} aria-label="Switch to {theme === 'dark' ? 'light' : 'dark'} mode" title="Switch to {theme === 'dark' ? 'light' : 'dark'} mode">
        {#if theme === 'dark'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        {/if}
      </button>
      <button
        class="icon menu"
        onclick={() => (menuOpen = !menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          {#if menuOpen}<path d="M6 6l12 12M18 6 6 18"/>{:else}<path d="M4 7h16M4 12h16M4 17h16"/>{/if}
        </svg>
      </button>
    </div>
  </div>

  {#if menuOpen}
    <nav id="mobile-menu" class="dropdown" aria-label="Sections" transition:fly={{ y: -8, duration: 150 }}>
      {#each links as link}
        <a href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
      {/each}
    </nav>
  {/if}
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
  }
  .bar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; height: 3.5rem; }
  .brand { font-weight: 700; text-decoration: none; letter-spacing: -0.01em; white-space: nowrap; }
  .right { display: flex; align-items: center; gap: 1.5rem; }
  .desktop { display: flex; align-items: center; gap: 1.5rem; }
  .desktop a { text-decoration: none; color: var(--muted); font-size: 0.95rem; white-space: nowrap; transition: color 0.15s; }
  .desktop a:hover { color: var(--text); }

  .icon {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: 50%;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }
  .icon:hover { color: var(--text); border-color: var(--text); }
  .menu { display: none; }
  .dropdown { display: none; }

  @media (max-width: 720px) {
    .desktop { display: none; }
    .right { gap: 0.5rem; }
    .menu { display: grid; }
    .dropdown {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 1.5rem;
      min-width: 12rem;
      padding: 0.4rem;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: 0 16px 32px -12px rgb(0 0 0 / 0.4);
    }
    .dropdown a {
      padding: 0.6rem 0.9rem;
      border-radius: 8px;
      text-decoration: none;
      color: var(--text);
    }
    .dropdown a:hover { background: var(--bg-soft); }
  }
</style>
