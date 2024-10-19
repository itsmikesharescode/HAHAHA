<script lang="ts">
  import { db } from '$lib/db/firebaseConfig';
  import { getFirestore, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
  import { Eye } from 'lucide-svelte';

  let count = $state(0);

  const incCount = async () => {
    const db = getFirestore();

    const viewCountRef = doc(db, 'viewCount', 'counter');

    try {
      await updateDoc(viewCountRef, {
        count: increment(1)
      });

      await getCounts();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getCounts = async () => {
    const docRef = doc(db, 'viewCount', 'counter');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        count = docSnap.data()?.count as number;
        console.log(count);
      } else {
        console.log('No such document!');
      }
    } catch (error: any) {
      console.log('Error getting document:', error.message);
    }
  };

  $effect(() => {
    incCount();
  });
</script>

<div class="flex items-center gap-2.5">
  <Eye class="h-[20px] w-[20px]" />
  <span>
    {count.toLocaleString()}
  </span>
</div>
