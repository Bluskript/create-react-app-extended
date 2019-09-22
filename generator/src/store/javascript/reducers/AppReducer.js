/**
 * This file is the controller for Redux.
 *
 * It handles dispatches from ../actions/AppActions.js and returns a new state.
 *
 * NOTE that the initial state is never mutated! It always returns a COPY of the original state!
 */
import { Actions } from '../actions/AppActions';

const initialState = {
  text: "this text is reactive! Type something below to see this text change!"
};

export default function AppReducer(state = initialState, action) {
  // this is VERY impractical for a single action. This assumes that you will be having more actions in the future.
  switch (action.type) {
    case Actions.CHANGE_TEXT: {
      /**
       * For whom may it concern : This is one of the best ways to copy redux state objects. If you are not aware of this type of syntax, reference
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
       */
      return {
        ...state,
        text: action.payload
      };
    }
    default:
      return state;
  }
}