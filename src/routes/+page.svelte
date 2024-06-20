<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
  
    // Check if the server address is set
    let serverAddress = localStorage.getItem('serverAddress');
  
    // Redirect based on the presence of the server address
    onMount(() => {
      if (!serverAddress) {
        goto('/setup');
      } else {
        goto('/login');
      }
    });
  </script>
  
  <style>
    .landing-page {
      @apply flex flex-col items-center justify-center h-screen;
    }
    .title {
      @apply text-5xl font-bold mb-4;
    }
    .subtitle {
      @apply text-2xl mb-8;
    }
  </style>
  
  <div class="landing-page">
    <h1 class="title">Welcome to Black Sheep POS</h1>
    <p class="subtitle">The best POS system for your restaurant</p>
    <button on:click={() => goto(serverAddress ? '/login' : '/setup')} class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Get Started
    </button>
  </div>
  