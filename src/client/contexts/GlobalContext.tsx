import useMedia from "@client/hooks/useMedia";
import { StateSetter } from "@client/interfaces/util.interface";
import React, {
  createContext, FC, useContext,
  useEffect,
  useState
} from "react";
import { IHeadData } from '@shared/types/shop.types';
import CssVariables from "@client/components/Common/CssVariables";
import { IVariables } from "@client/interfaces/variables.interface";

interface IGlobalContext {
  media: Record<string, boolean>;
  setCssVariables: StateSetter<IVariables>;
  cssVariables: IVariables;
  loading: boolean;
  setLoading: StateSetter<boolean>;
  setHeadData: StateSetter<IHeadData>;
  headData: IHeadData;
}

interface IGlobalContextProviderProps {
  children: React.ReactNode;
  headData: IHeadData;
}

const Context = createContext({} as IGlobalContext);

export const GlobalContextProvider: FC<IGlobalContextProviderProps> = 
  ({ children, headData: headDataProp }) => {
    const [loading, setLoading] = useState(true);
    const [headData, setHeadData] = useState<IHeadData>(
      headDataProp || {} as IHeadData
    );
    const [cssVariables, setCssVariables] = useState<IVariables>({
      headerHeight: 0,
    });
    const media = useMedia(
      ['small', 'screen and (max-width: 31.25em)'],
      ['mobile', 'only screen and (max-width: 48em)'],
      ['tablet', 'only screen and (max-width: 64em)'],
      ['wide', '(min-width: 87.5em)']
    );

    const state: IGlobalContext = {
      media,
      setCssVariables,
      cssVariables,
      setLoading,
      loading,
      setHeadData,
      headData,
    };

    return (
      <Context.Provider value={state}>
        {headData.interfaceSettings && (
          <CssVariables interfaceSettings={headData.interfaceSettings} />
        )}
        {children}
      </Context.Provider>
    );
  };

export const useGlobalContext = () => useContext(Context);