<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import Button from '$lib/components/ui/button/button.svelte';
  import { MessageCircle, X, Send, Loader } from 'lucide-svelte';
  import { Textarea } from '$lib/components/ui/textarea';
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
  import * as Avatar from '$lib/components/ui/avatar';
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/db/firebaseConfig';
  import { fromUserState } from '$lib/components/state/userState.svelte';
  import { toast } from 'svelte-sonner';

  let open = $state(false);
  let chatContainer = $state('');
  let sendingLoader = $state(false);

  const userState = fromUserState();
  const userRef = $derived(userState.get());
  const handleSubmitChat = async () => {
    if (!userRef) return;

    sendingLoader = true;
    try {
      await setDoc(doc(db, 'chats', userRef.uid), {
        displayName: userRef.displayName,
        email: userRef.email,
        photoURL: userRef.photoURL,
        chat: chatContainer
      });
    } catch (error: any) {
      toast.error('', { description: error.message });
    }
    sendingLoader = false;
  };
</script>

<Button onclick={() => (open = true)} variant="secondary" class="gap-1.5">
  <MessageCircle />
  Global Chat
</Button>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="flex max-h-screen min-h-[50dvh] max-w-[800px] flex-col">
    <button
      onclick={() => (open = false)}
      class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
    >
      <X class="h-4 w-4" />
      <span class="sr-only">Close</span>
    </button>

    <AlertDialog.Header>
      <AlertDialog.Title>Global Chat</AlertDialog.Title>
    </AlertDialog.Header>

    <!--Screen area-->
    <ScrollArea class="h-[70dvh] w-full">
      <div class="flex flex-col gap-2.5">
        {#each Array(30) as _}
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center gap-1.5">
              <Avatar.Root>
                <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
              <div class="">
                <p class="line-clamp-1 text-sm">Mike John</p>
                <p class="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} @ {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div class="rounded-lg bg-secondary p-2">
              <pre
                class="text-wrap font-sans text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur cupiditate numquam voluptatum quae nesciunt voluptate id non nihil soluta. Aliquid esse quos minima itaque quisquam asperiores, laboriosam eos quaerat provident, porro incidunt, odio beatae eius. Sequi itaque nemo deleniti minus, animi earum quis eos rerum unde reiciendis rem, libero consequatur.</pre>
            </div>
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex w-full flex-row-reverse items-center gap-1.5">
              <Avatar.Root>
                <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
              <div class="">
                <p class="line-clamp-1 text-right text-sm">Mike John</p>
                <p class="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} @ {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div class="rounded-lg bg-secondary p-2">
              <pre
                class="text-wrap font-sans text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur cupiditate numquam voluptatum quae nesciunt voluptate id non nihil soluta. Aliquid esse quos minima itaque quisquam asperiores, laboriosam eos quaerat provident, porro incidunt, odio beatae eius. Sequi itaque nemo deleniti minus, animi earum quis eos rerum unde reiciendis rem, libero consequatur.</pre>
            </div>
          </div>
        {/each}
      </div>
    </ScrollArea>

    <div class="flex items-center gap-1.5">
      <Textarea placeholder="Say something..." bind:value={chatContainer} />
      <Button disabled={sendingLoader} onclick={handleSubmitChat} variant="secondary">
        {#if sendingLoader}
          <Loader class="h-[20px] w-[20px] animate-spin " />
        {:else}
          <Send class="h-[20px] w-[20px]" />
        {/if}
      </Button>
    </div>
  </AlertDialog.Content>
</AlertDialog.Root>
