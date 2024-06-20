<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    let serverAddress = localStorage.getItem('serverAddress') || 'http://localhost:3000';
    let username = '';
    let password = '';
    let passcode = '';
    const dispatch = createEventDispatcher();
  
    async function login() {
      const response = await fetch(`${serverAddress}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, passcode })
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        dispatch('login');
      } else {
        alert('Login failed');
      }
    }
  </script>
  
  <div class="flex flex-col items-center justify-center h-screen">
    <input type="text" bind:value={username} placeholder="Username" class="input" />
    <input type="password" bind:value={password} placeholder="Password" class="input" />
    <input type="text" bind:value={passcode} placeholder="2FA Passcode" class="input" />
    <button on:click={login} class="btn btn-primary">Login</button>
  </div>
  