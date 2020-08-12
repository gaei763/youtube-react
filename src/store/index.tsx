import React, { createContext, useReducer, ReactNode } from "react";
import {
  SET_POPULAR,
  SET_SELECTED,
  SET_RELATED,
  SET_TERM,
  SET_SEARCHED,
} from "../action";
import { MovieResorce, YoutubeRelatedResponse } from "../apis/index";

interface globalStateType {
  popular: MovieResorce[];
  related: YoutubeRelatedResponse[];
  searched: YoutubeRelatedResponse[];
  selected: MovieResorce | null;
  term: string;
}

interface StoreProviderProps {
  children: ReactNode;
}

const initialState: globalStateType = {
  popular: [],
  related: [],
  searched: [],
  selected: null,
  term: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SET_POPULAR:
      return { ...state, popular: action.payload.popular };
    case SET_RELATED:
      return { ...state, related: action.payload.related };
    case SET_SEARCHED:
      return { ...state, searched: action.payload.searched };
    case SET_SELECTED:
      return { ...state, selected: action.payload.selected };
    case SET_TERM:
      return { ...state, term: action.payload.term };
    default:
      return state;
  }
};

export const Store = createContext({
  globalState: initialState,
  setGlobalState: (e: any) => {
    e = initialState;
  },
});

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [globalState, setGlobalState] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ globalState, setGlobalState }}>
      {children}
    </Store.Provider>
  );
};
