/**
 * This file is the controller for Redux.
 *
 * It handles dispatches from ../actions/AppActions.ts and returns a new state.
 *
 * The initial state is never mutated. It always returns a copy of the original state.
 */

import { Actions, ActionTypes, IAppState } from '../types';

const initialState: IAppState = {
  text: 'this text is reactive! Type something below to see this text change!',
};

export default function AppReducer(state = initialState, action: ActionTypes): IAppState {
  // this is VERY impractical for a single action. This assumes that you will be having more actions in the future.
  switch (action.type) {
    case Actions.CHANGE_TEXT: {
      /**
       * For whom may it concern : This is the recommended way to copy redux state objects.
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
       */
      return {
        ...state,
        text: action.payload,
      };
    }
    default:
      return state;
  }
}
