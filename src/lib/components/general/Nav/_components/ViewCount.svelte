<script lang="ts">
  import { Eye } from 'lucide-svelte';
  let count = 0;
</script>

<div class="flex items-center gap-2.5">
  <Eye class="h-[20px] w-[20px]" />
  <span>
    {count.toLocaleString()}
  </span>
</div>
