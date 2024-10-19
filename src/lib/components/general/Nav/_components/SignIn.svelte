<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { auth } from '$lib/db/firebaseConfig';
  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const signInHandler = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
</script>

<Button onclick={signInHandler} class="gap-1.5">
  Sign In
  <img
    src="https://www.svgrepo.com/show/448227/google.svg"
    alt="googleLogo"
    class="h-[20px] w-[20px]"
  />
</Button>
