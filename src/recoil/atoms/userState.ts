import { atom, AtomEffect } from 'recoil';
import { User } from '../../types/types';

const localStorageEffect: <T>(key: string) => AtomEffect<T | null> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const user = localStorage.getItem(key);
    if (user !== null) {
      // initialize atom value
      setSelf(JSON.parse(user));
    }

    // reset atom value
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const userState = atom<User | null>({
  key: 'UserState',
  default: null,
  effects: [localStorageEffect<User>('user')],
});
