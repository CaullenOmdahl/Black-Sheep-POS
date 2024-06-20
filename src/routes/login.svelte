<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import axios from 'axios';
  
    let username = writable('');
    let password = writable('');
    let twoFACode = writable('');
    let twoFAEnabled = writable(false);
  
    const login = async () => {
      try {
        const response = await axios.post('/api/login', {
          username: $username,
          password: $password,
          twoFACode: $twoFACode
        });
        console.log('Login successful', response.data);
      } catch (error) {
        console.error('Login failed', error);
      }
    };
  </script>
  
  <form on:submit|preventDefault={login}>
    <div>
      <label>Username:</label>
      <input type="text" bind:value={$username} required />
    </div>
    <div>
      <label>Password:</label>
      <input type="password" bind:value={$password} required />
    </div>
    {#if $twoFAEnabled}
      <div>
        <label>2FA Code:</label>
        <input type="text" bind:value={$twoFACode} required />
      </div>
    {/if}
    <button type="submit">Login</button>
  </form>
  