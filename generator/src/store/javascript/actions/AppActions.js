export const Actions = {
  CHANGE_TEXT: 'CHANGE_TEXT',
};

export function changeText(payload) {
  return {
    type: Actions.CHANGE_TEXT,
    payload,
  };
}
