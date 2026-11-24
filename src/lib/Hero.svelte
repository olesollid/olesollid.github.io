<script lang="ts">
  import { profile } from '../data/profile';
</script>

<section id="top" class="hero">
  <div class="container">
    <p class="eyebrow">{profile.tagline}</p>
    <h1>{profile.name}</h1>
    <div class="about">
      {#each profile.about as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
    <ul class="links">
      {#each profile.links as link}
        <li><a class="btn ghost" href={link.href}>{link.label}</a></li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .hero { padding: 7rem 0 4.5rem; }
  .eyebrow { color: var(--accent); font-weight: 600; margin-bottom: 1rem; }
  h1 { font-size: clamp(3rem, 9vw, 6rem); font-weight: 800; margin-bottom: 2rem; }
  .about { max-width: 38rem; display: grid; gap: 1rem; font-size: 1.25rem; color: var(--muted); }
  .links { list-style: none; padding: 0; margin: 2.5rem 0 0; display: flex; flex-wrap: wrap; gap: 0.75rem; }
  @media (max-width: 640px) { .hero { padding: 5rem 0 4rem; } }
</style>
