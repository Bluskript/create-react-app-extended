export const Actions = {
  CHANGE_TEXT: "CHANGE_TEXT"
};

// not using arrow functions because normal functions look nicer lol
export function changeText(payload) {
  return {
    type: Actions.CHANGE_TEXT,
    payload
  }
}