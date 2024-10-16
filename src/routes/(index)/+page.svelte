<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { ArrowLeftRight, Copy } from 'lucide-svelte';
  import { toast } from 'svelte-sonner';

  let inputs = $state({
    px: '',
    rem: '',
    base: 16
  });

  const calculatePXtoREM = () => {
    inputs.rem = String(Number(inputs.px) / inputs.base);
  };

  const calculateREMToPX = () => {
    inputs.px = String(Number(inputs.rem) * inputs.base);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Success', {
          description: `Copied ${text}`,
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo')
          }
        });
      })
      .catch((err) => {
        toast.error('Error', {
          description: `Copied ${text}`,
          action: {
            label: 'Undo',
            onClick: () => console.info('Undo')
          }
        });
      });
  };
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
  <div class="flex items-center gap-2.5">
    <div class="flex w-full max-w-sm flex-col gap-1.5">
      <Label for="px" class="font-bold">Pixel</Label>
      <div class="relative flex items-center">
        <Input
          onkeyup={calculatePXtoREM}
          type="text"
          id="px"
          bind:value={inputs.px}
          class="h-24 px-[4.5rem] text-center text-[30px]"
        />
        <div class="absolute right-8 flex h-8 w-8 items-center">
          <Button
            onclick={() => {
              copyToClipboard(inputs.px);
            }}
            variant="ghost"
          >
            <Copy />
          </Button>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">Enter the pixel value.</p>
    </div>

    <ArrowLeftRight />

    <div class="flex w-full max-w-sm flex-col gap-1.5">
      <Label for="rem" class="font-bold">Rem</Label>
      <div class="relative flex items-center">
        <Input
          onkeyup={calculateREMToPX}
          type="text"
          id="rem"
          bind:value={inputs.rem}
          class="h-24 px-[4.5rem] text-center text-[30px]"
        />
        <div class="absolute right-8 flex h-8 w-8 items-center">
          <Button
            onclick={() => {
              copyToClipboard(inputs.rem);
            }}
            variant="ghost"
          >
            <Copy />
          </Button>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">Enter the rem value.</p>
    </div>
  </div>

  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="px" class="font-bold">Base</Label>

    <Input
      onkeyup={calculatePXtoREM}
      type="text"
      id="px"
      bind:value={inputs.base}
      class="text-center text-[30px]"
    />

    <p class="text-sm text-muted-foreground">Enter the base value.</p>
  </div>
</div>
