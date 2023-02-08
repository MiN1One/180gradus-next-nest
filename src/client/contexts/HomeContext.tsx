import { StateSetter } from "@client/interfaces/util.interface";
import { createContext, useContext, useState } from "react";

interface IHomeContext {
  scrollStart: boolean;
  setScrollStart: StateSetter<boolean>;
}

interface HomeContextProviderProps {
  children: React.ReactNode;
}

export const homeContext = createContext({} as IHomeContext);

export const useHomeContext = () => useContext(homeContext);

export function HomeContextProvider(props: HomeContextProviderProps) {
  const { children } = props;
  const [scrollStart, setScrollStart] = useState(false);

  const state: IHomeContext = {
    scrollStart,
    setScrollStart,
  };

  return (
    <homeContext.Provider value={state}>
      {children}
    </homeContext.Provider>
  );
}

export function withHomeContext(Cmp: React.ComponentType) {
  return function() {
    return (
      <HomeContextProvider>
        <Cmp />
      </HomeContextProvider>
    )
  }
}