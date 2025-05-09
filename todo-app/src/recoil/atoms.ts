import { atom } from 'recoil';

export const todoListState = atom({
  key: 'todoListState',
  default: [] as { id: number; text: string; completed: boolean }[],
});