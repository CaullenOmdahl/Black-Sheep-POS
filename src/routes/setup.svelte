<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  let serverAddress = 'http://localhost:3000';
  let username = '';
  let password = '';
  let passkey = '';

  async function setup() {
    const response = await fetch(`${serverAddress}/api/setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passkey })
    });
    if (response.ok) {
      goto('/login');
    } else {
      alert('Setup failed');
    }
  }
</script>

<div class="flex flex-col items-center justify-center h-screen">
  <h1 class="text-2xl mb-4">Initial Setup</h1>
  <input type="text" bind:value={serverAddress} placeholder="Server Address" class="input mb-2" />
  <input type="text" bind:value={username} placeholder="Admin Username" class="input mb-2" />
  <input type="password" bind:value={password} placeholder="Admin Password" class="input mb-2" />
  <input type="text" bind:value={passkey} placeholder="2FA Passkey" class="input mb-2" />
  <button on:click={setup} class="btn btn-primary">Setup</button>
</div>
