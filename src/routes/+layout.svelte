<script lang="ts">
  import Footer from '$lib/components/general/Footer.svelte';
  import Nav from '$lib/components/general/Nav/Nav.svelte';
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import ChatChamber from '$lib/components/general/Nav/_components/ChatChamber/ChatChamber.svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/db/firebaseConfig';
  import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
  import { fromUserState, initUserState } from '$lib/state/userState.svelte';
  import { toast } from 'svelte-sonner';
  import type { Chats } from '$lib/types';
  import { onDestroy } from 'svelte';
  import { chats } from '$lib/state/chats.svelte';
  const { children } = $props();

  initUserState();

  const userState = fromUserState();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userState.set(user);

      const q = query(collection(db, 'chats'), orderBy('timeStamp', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chatsTemp: Chats[] = [];
        querySnapshot.forEach((doc) => {
          chatsTemp.push({ ...(doc.data() as Chats) });
        });

        chats.set(chatsTemp);
      });

      toast.success('', { description: `Welcome back! ${user.displayName}` });
    } else {
      userState.set(null);
      const q = query(collection(db, 'chats'), orderBy('timeStamp', 'asc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let chatsTemp: Chats[] = [];
        querySnapshot.forEach((doc) => {
          chatsTemp.push({ ...(doc.data() as Chats) });
        });

        chats.set(chatsTemp);
      });
    }
  });
</script>

<Toaster />
<ModeWatcher />

<Nav />

<div class="container fixed bottom-5 left-0 right-0 p-2.5">
  <div class=" flex w-full justify-end">
    <ChatChamber />
  </div>
</div>
{@render children()}
<Footer />
