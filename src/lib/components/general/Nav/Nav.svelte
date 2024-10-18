<script lang="ts">
  import { fromUserState } from '$lib/components/state/userState.svelte';
  import SignIn from './_components/SignIn.svelte';
  import UserProfile from './_components/UserProfile/UserProfile.svelte';
  import ViewCount from './_components/ViewCount.svelte';

  const userState = fromUserState();
</script>

<nav class="container sticky top-0 flex items-center justify-between p-2.5">
  <ViewCount />

  {#if userState.get()}
    <UserProfile />
  {:else}
    <SignIn />
  {/if}
</nav>
