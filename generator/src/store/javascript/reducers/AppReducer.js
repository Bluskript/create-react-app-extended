/**
 * This file is the controller for Redux.
 *
 * It handles dispatches from ../actions/AppActions.ts and returns a new state.
 *
 * The initial state is never mutated. It always returns a copy of the original state.
 */

import { Actions } from '../actions/AppActions';

const initialState = {
  text: 'this text is reactive! Type something below to see this text change!',
};

export default function AppReducer(state = initialState, action) {
  // this is VERY impractical for a single action. This assumes that you will be having more actions in the future.
  switch (action.type) {
    case Actions.CHANGE_TEXT: {
      /**
       * This is the recommended way to copy redux objects
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
