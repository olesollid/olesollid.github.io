<script lang="ts">
  import { profile } from '../data/profile';
</script>

<section id="contact" class="section">
  <div class="container">
    <h2 class="section-title">Contact</h2>
    <h3>Get in touch</h3>
    <p>I'm open to internships, developer roles and project collaborations. Feel free to reach out!</p>
    <a class="btn" href="mailto:{profile.email}">{profile.email}</a>
  </div>
</section>

<style>
  h3 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 800; margin-bottom: 1rem; }
  p { color: var(--muted); font-size: 1.15rem; margin-bottom: 2rem; max-width: 34rem; }
</style>
