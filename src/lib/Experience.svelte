<script lang="ts">
  import { profile } from '../data/profile';
  import { experience, entryTypes } from '../data/experience';
  import type { EntryType } from '../data/types';
  import { formatPeriod, isPresent, sortEntries } from './dates';

  let filter = $state<EntryType | 'all'>('all');

  const filters = [
    { type: 'all' as const, label: 'All' },
    ...entryTypes.filter((t) => experience.some((e) => e.type === t.type)),
  ];

  const sorted = sortEntries(experience);
  const visible = $derived(filter === 'all' ? sorted : sorted.filter((e) => e.type === filter));
</script>

<section id="experience" class="section">
  <div class="container">
    <div class="head">
      <div class="title">
        <h2 class="section-title">Experience</h2>
        {#if profile.cvUrl}
          <a class="btn ghost download" href={profile.cvUrl} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 13h6M9 17h6"/></svg>
            View PDF
          </a>
        {/if}
      </div>
      <div class="filters" role="group" aria-label="Filter entries">
        {#each filters as f}
          <button class:active={filter === f.type} aria-pressed={filter === f.type} onclick={() => (filter = f.type)}>
            {f.label}
          </button>
        {/each}
      </div>
    </div>

    <ol>
      {#each visible as job (job)}
        <li>
          <p class="period" class:ongoing={isPresent(job.end)}>{formatPeriod(job.start, job.end)}</p>
          <div>
            <h3>{job.role}</h3>
            <p class="company">
              {#if job.companyUrl}
                <a href={job.companyUrl} target="_blank" rel="noopener noreferrer">{job.company}</a>
              {:else}
                {job.company}
              {/if}
            </p>
            <p class="summary">{job.summary}</p>
            {#if job.highlights?.length}
              <ul class="highlights">
                {#each job.highlights as item}<li>{item}</li>{/each}
              </ul>
            {/if}
            {#if job.tags?.length}
              <p class="tags">{#each job.tags as tag}<span class="tag">{tag}</span>{/each}</p>
            {/if}
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .section { padding: 3.5rem 0; }
  .head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 1rem; margin-bottom: 1.5rem; }
  .title { display: flex; flex-direction: column; align-items: flex-start; gap: 0.9rem; }
  .head .section-title { margin: 0; }
  .download { padding: 0.3rem 0.9rem; font-size: 0.85rem; }
  .filters { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .filters button {
    font: inherit;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.3rem 0.9rem;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
  }
  .filters button:hover { color: var(--text); border-color: var(--text); }
  .filters button.active { background: var(--text); color: var(--bg); border-color: var(--text); }

  ol { list-style: none; margin: 0; padding: 0; }
  ol > li {
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 1.5rem;
    padding: 1.4rem 0;
    border-top: 1px solid var(--border);
  }
  .period { color: var(--muted); font-size: 0.95rem; font-variant-numeric: tabular-nums; }
  .period.ongoing { color: var(--accent); font-weight: 500; }
  h3 { font-size: 1.25rem; }
  .company { color: var(--accent); font-weight: 500; margin-bottom: 0.4rem; }
  .company a { text-decoration: none; }
  .company a:hover { text-decoration: underline; }
  .highlights { margin: 0.5rem 0 0; padding-left: 1.2rem; color: var(--muted); }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
  @media (max-width: 720px) {
    ol > li { grid-template-columns: 1fr; gap: 0.25rem; }
  }
</style>
