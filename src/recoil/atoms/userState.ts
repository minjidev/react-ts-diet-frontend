import { atom, AtomEffect } from 'recoil';
import { UserData } from '../../types/types';

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

export const userState = atom<UserData | null>({
  key: 'UserState',
  default: null,
  effects: [localStorageEffect<UserData>('user')],
});
