<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import axios from 'axios';
  
    let serverAddress = writable('');
    let adminUsername = writable('');
    let adminPassword = writable('');
    let twoFAEnabled = writable(false);
  
    const setupAdmin = async () => {
      try {
        const response = await axios.post('/api/setup', {
          serverAddress: $serverAddress,
          username: $adminUsername,
          password: $adminPassword,
          twoFA: $twoFAEnabled
        });
        console.log('Setup successful', response.data);
      } catch (error) {
        console.error('Setup failed', error);
      }
    };
  </script>
  
  <form on:submit|preventDefault={setupAdmin}>
    <div>
      <label>Server Address:</label>
      <input type="text" bind:value={$serverAddress} required />
    </div>
    <div>
      <label>Admin Username:</label>
      <input type="text" bind:value={$adminUsername} required />
    </div>
    <div>
      <label>Admin Password:</label>
      <input type="password" bind:value={$adminPassword} required />
    </div>
    <div>
      <label>Enable 2FA:</label>
      <input type="checkbox" bind:checked={$twoFAEnabled} />
    </div>
    <button type="submit">Setup</button>
  </form>
  