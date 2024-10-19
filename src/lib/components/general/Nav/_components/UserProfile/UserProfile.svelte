<script lang="ts">
  import * as Popover from '$lib/components/ui/popover';
  import * as Avatar from '$lib/components/ui/avatar';
  import Logout from './Logout.svelte';
  import { fromUserState } from '$lib/state/userState.svelte';

  const userState = fromUserState();

  let logoutSignal = $state(false);
  let open = $state(false);

  const userRef = $derived(userState.get());
</script>

{#if userRef}
  <Popover.Root bind:open>
    <Popover.Trigger>
      <Avatar.Root>
        <Avatar.Image src={userRef.photoURL} alt={`${userRef.displayName} photo`} />
        <Avatar.Fallback>{(userRef.displayName ?? '')[0]}</Avatar.Fallback>
      </Avatar.Root>
    </Popover.Trigger>
    <Popover.Content>
      <div class="flex items-center gap-2.5">
        <Avatar.Root>
          <Avatar.Image src={userRef.photoURL} alt={`${userRef.displayName} photo`} />
          <Avatar.Fallback>{(userRef.displayName ?? '')[0]}</Avatar.Fallback>
        </Avatar.Root>

        <div class="flex w-full flex-col">
          <div class="grid grid-cols-2">
            <p class="line-clamp-1 w-full text-sm">{userRef.displayName}</p>
            <div class="flex items-center justify-end">
              <button
                onclick={() => {
                  logoutSignal = true;
                  open = false;
                }}
                class=" float-right max-w-fit bg-secondary px-2 text-xs">Log out</button
              >
            </div>
          </div>
          <p class="text-sm text-muted-foreground">Mikey@gmail.com</p>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
{/if}

<Logout bind:logoutSignal />
