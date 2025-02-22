<script lang="ts">
  import { Sun, PawPrint, Waves, Wand, Skull } from 'lucide-svelte/icons';

  const magicSchools = [
    {
      title: "Thaumaturgy",
      description: "A school of light and holy energy, specializing in healing and protection. Mend wounds, create protective barriers, and enhance allies while being particularly effective against dark creatures.",
      href: "/magic/thaumaturgy",
      icon: Sun
    },
    {
      title: "Mysticism",
      description: "Masters of battlefield control through psychic manipulation. Confuse, immobilize, and weaken enemies' resolve to gain tactical advantages in combat.",
      href: "/magic/mysticism",
      icon: PawPrint
    },
    {
      title: "Elementalism",
      description: "Harness earth, wind, fire, and air to devastate enemies. Enchant weapons with elemental energy to enhance physical attacks with nature's destructive power.",
      href: "/magic/elementalism",
      icon: Waves
    },
    {
      title: "Sorcery",
      description: "Practical utility magic including teleportation, invisibility, and lockpicking. Masters of enchanting can permanently imbue items with new abilities—at great risk.",
      href: "/magic/sorcery",
      icon: Wand
    },
    {
      title: "Necromancy",
      description: "A dark and forbidden school focusing on acid, poison, and curses. Weaken foes while summoning creatures and demons to fight by your side.",
      href: "/magic/necromancy",
      icon: Skull
    }
  ];
</script>

<div class="magic-container">
  <header class="page-header">
    <h1>Schools of Magic</h1>
    <p>Discover the five schools of magic and their unique spells and abilities.</p>
  </header>

  <div class="magic-grid">
    {#each magicSchools as school}
      <a href={school.href} class="magic-card">
        <div class="card-header">
          <span class="icon"><school.icon size={24} /></span>
          <h2>{school.title}</h2>
        </div>
        <p>{school.description}</p>
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  @use '$lib/scss/view_mixins' as *;

  .magic-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .page-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--color-header);
      font-family: 'Garamond', serif;
    }

    p {
      font-size: 1.25rem;
      max-width: 42rem;
      margin: 0 auto;
      color: var(--color-text);
    }
  }

  .magic-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;

    @include tablet-and-up {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }

  .magic-card {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
    border-radius: 4px;
    transition: transform 0.2s ease, background-color 0.2s ease;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-hover);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .icon {
        color: var(--color-text-accent);
      }

      h2 {
        color: var(--color-header);
        font-size: 1.25rem;
        margin: 0;
        border: none;
      }
    }

    p {
      color: var(--color-text);
    }
  }
</style>