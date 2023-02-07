import { useGlobalContext } from "@client/contexts/GlobalContext";
import dynamic from "next/dynamic";
import React, { memo } from "react";
import SafeHydrate from "./SafeHydrate";

interface LayoutProps {
  children: React.ReactNode;
}

const AsyncNavigation = dynamic(() => (
  import('@client/components/Navigation/Navigation')
));

function Layout({ children }: LayoutProps) {
  const { media, headData } = useGlobalContext();
  return (
    <React.Fragment>
      <SafeHydrate releaseContent>
        {headData.headerData && media.mobile 
          ? null
          : <AsyncNavigation />
        }
      </SafeHydrate>
      {children}
    </React.Fragment>
  );
};

export default memo(Layout);