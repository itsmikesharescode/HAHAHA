<script>
  import Footer from '$lib/components/general/Footer.svelte';
  import Nav from '$lib/components/general/Nav.svelte';
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  const { children } = $props();
</script>

<Toaster />
<ModeWatcher />
<Nav />
{@render children()}
<Footer />
