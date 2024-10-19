<script lang="ts">
  import { fromUserState } from '$lib/state/userState.svelte';
  import SignIn from './_components/SignIn.svelte';
  import UserProfile from './_components/UserProfile/UserProfile.svelte';
  import ViewCount from './_components/ViewCount.svelte';

  const userState = fromUserState();
</script>

<nav
  class="container sticky top-0 z-40 flex items-center justify-between border-b-2 p-2.5 backdrop-blur-sm"
>
  <ViewCount />

  {#if userState.get()}
    <UserProfile />
  {:else}
    <SignIn />
  {/if}
</nav>
