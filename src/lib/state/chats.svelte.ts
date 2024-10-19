import type { Chats } from '$lib/types';

class ChatState {
  private chats = $state<Chats[]>([]);

  set(p: Chats[]) {
    this.chats = p;
  }

  get() {
    return this.chats;
  }
}

export const chats = new ChatState();
