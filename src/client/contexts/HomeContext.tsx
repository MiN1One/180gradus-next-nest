import { StateSetter } from "@client/interfaces/util.interface";
import { createContext, useContext, useState } from "react";
import { IHomeData } from '@shared/types/home.types';

interface IHomeContext {
  scrollStart: boolean;
  setScrollStart: StateSetter<boolean>;
  homeSettings: IHomeData;
  setHomeSettings: StateSetter<IHomeData>;
}

interface HomeContextProviderProps {
  children: React.ReactNode;
  initialSettings: IHomeData;
}

export const homeContext = createContext({} as IHomeContext);

export const useHomeContext = () => useContext(homeContext);

export function HomeContextProvider(props: HomeContextProviderProps) {
  const { children, initialSettings } = props;
  const [scrollStart, setScrollStart] = useState(false);
  const [homeSettings, setHomeSettings] = useState<IHomeData | null>(
    initialSettings || null
  );

  const state: IHomeContext = {
    scrollStart,
    setScrollStart,
    homeSettings,
    setHomeSettings,
  };

  return (
    <homeContext.Provider value={state}>
      {children}
    </homeContext.Provider>
  );
}

export function withHomeContext(Cmp: React.ComponentType) {
  return function(props: { initialSettings: IHomeData; }) {
    return (
      <HomeContextProvider initialSettings={props.initialSettings}>
        <Cmp />
      </HomeContextProvider>
    )
  }
}