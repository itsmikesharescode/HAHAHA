import type { User } from 'firebase/auth';
import { getContext, setContext } from 'svelte';

class UserState {
  private user = $state<User | null>(null);

  set(p: User | null) {
    this.user = p;
  }

  get() {
    return this.user;
  }
}

const UserStateKey = Symbol(crypto.randomUUID());

export const initUserState = () => {
  return setContext(UserStateKey, new UserState());
};

export const fromUserState = () => {
  return getContext<ReturnType<typeof initUserState>>(UserStateKey);
};
