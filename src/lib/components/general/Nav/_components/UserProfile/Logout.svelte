<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Loader } from 'lucide-svelte';
  import { signOut } from 'firebase/auth';
  import { auth } from '$lib/db/firebaseConfig';
  import { toast } from 'svelte-sonner';

  interface Props {
    logoutSignal: boolean;
  }

  let { logoutSignal = $bindable() }: Props = $props();

  let logoutLoader = $state(false);

  const logoutHandler = async () => {
    logoutLoader = true;
    await signOut(auth);
    logoutLoader = false;
    toast.success('', { description: 'Thank you come back again!' });
  };
</script>

<AlertDialog.Root bind:open={logoutSignal}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description
        >You are about to logout mike px2rem million startup.</AlertDialog.Description
      >
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button onclick={logoutHandler} disabled={logoutLoader} class="relative">
        {#if logoutLoader}<div
            class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-lg bg-primary"
          >
            <Loader class="h-[20px] w-[20px] animate-spin" />
          </div>
        {/if}
        Continue
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
