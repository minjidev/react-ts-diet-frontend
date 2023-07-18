import { atom, AtomEffect } from 'recoil';

const localStorageEffect: <T>(key: string) => AtomEffect<T | null> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const user = localStorage.getItem(key);
    if (user !== null) {
      setSelf(JSON.parse(user));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

interface User {
  email: string;
  username: string;
}

export const userState = atom<User[] | null>({
  key: 'UserState',
  default: null,
  effects: [localStorageEffect<User[]>('user')],
});
