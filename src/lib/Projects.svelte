<script lang="ts">
  import { projects } from '../data/projects';
  import Slideshow from './Slideshow.svelte';
  import ProjectVideo from './ProjectVideo.svelte';
</script>

<section id="projects" class="section">
  <div class="container">
    <h2 class="section-title">Side projects</h2>
    <div class="list">
      {#each projects as project}
        <article>
          {#if project.video}
            <ProjectVideo video={project.video} />
          {:else}
            <Slideshow images={project.images ?? []} label={project.title} />
          {/if}
          <div class="info">
            <h3>
              {#if project.icon}<img class="icon" src={project.icon} alt="" width="32" height="32" />{/if}
              {project.title}
            </h3>
            <p class="desc">{project.description}</p>
            <p class="tags">{#each project.tags as tag}<span class="tag">{tag}</span>{/each}</p>
            <p class="actions">
              <a class="btn" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
                View source
              </a>
              {#if project.liveUrl}
                <a class="btn ghost" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live demo</a>
              {/if}
            </p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .list { display: grid; gap: 5rem; }
  article { display: grid; grid-template-columns: 1.4fr 1fr; gap: 3rem; align-items: center; }
  article:nth-child(even) { grid-template-columns: 1fr 1.4fr; }
  article:nth-child(even) :global(.media) { order: 2; }
  h3 { font-size: 1.9rem; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.6rem; }
  .icon { width: 2.5rem; height: 2.5rem; border-radius: 22%; flex: none; }
  .desc { color: var(--muted); }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1.25rem 0; }
  .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  @media (max-width: 860px) {
    article, article:nth-child(even) { grid-template-columns: 1fr; gap: 1.5rem; }
    article:nth-child(even) :global(.media) { order: 0; }
  }
</style>
