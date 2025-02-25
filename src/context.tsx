"use client";

import type {SYMBOLS} from "@/lib/utils";
import React from "react";

type Theme = "light" | "dark";

interface State {
  theme: Theme;
  isTimeFiltering: boolean;
  selectedSymbol: string | null;
}

type Action =
  | { type: "SWITCH_THEME" }
  | { type: "TOGGLE_TIME_FILTERING"; isTimeFiltering: boolean }
  | { type: "SELECT_SYMBOL"; symbol?: typeof SYMBOLS[number]};

const AppContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SWITCH_THEME": {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return {...state, theme: newTheme};
    }
    case "TOGGLE_TIME_FILTERING":
      return {...state, isTimeFiltering: action.isTimeFiltering};
    case "SELECT_SYMBOL":
      return {...state, selectedSymbol: action.symbol || null};
    default:
      return state;
  }
};

const AppContextProvider = ({children}: React.PropsWithChildren) => {

  const [state, dispatch] = React.useReducer(reducer, {
    theme: (localStorage.getItem("theme") as Theme) || "light",
    isTimeFiltering: true,
    selectedSymbol: null,
  });

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export {AppContextProvider, useAppContext}
