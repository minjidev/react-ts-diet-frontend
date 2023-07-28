import { atom, AtomEffect } from 'recoil';
import { User } from '../../types/types';

const localStorageEffect: <T>(key: string) => AtomEffect<T | null> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const user = localStorage.getItem(key);
    if (user !== null) {
      //  연결된 atom 의 값을 초기화
      setSelf(JSON.parse(user));
    }

    // 해당하는 atom 의 값이 변경이 되었을 때 실행
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userState = atom<User | null>({
  key: 'UserState',
  default: null,
  effects: [localStorageEffect<User>('user')],
});
