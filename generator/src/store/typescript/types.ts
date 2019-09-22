export enum Actions {
  CHANGE_TEXT
}

// this is the interface which lays out the types for each state item.
export interface IAppState {
  text: string
}

export interface IChangeText {
  type: Actions.CHANGE_TEXT,
  payload: string
}

// this is not practical when using just a single action, but this good practice when you start making your app bigger
export type ActionTypes = IChangeText;