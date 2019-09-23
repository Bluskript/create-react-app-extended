import { Actions, IChangeText } from '../types';

export function changeText(payload: string): IChangeText {
  return {
    type: Actions.CHANGE_TEXT,
    payload,
  };
}
