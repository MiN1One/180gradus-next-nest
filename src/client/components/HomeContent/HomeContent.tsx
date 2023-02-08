import { useHomeContext } from "@client/contexts/HomeContext";
import { memo, useCallback } from "react";
import { HeroBackground, HeroTop } from "../Hero/Hero";
import { ScrollContainer } from "../ScrollContainer/ScrollContainer";

function HomeContent() {
  const { setScrollStart } = useHomeContext();

  const onStartScroll = useCallback(
    (height: number, _: number, index: number) => {
      if (height > 0 || index > 0) {
        setScrollStart(true);
      }
    }, []
  );

  const onScrollTop = useCallback(() => {
    setScrollStart(false);
  }, []);

  return (
    <main>
      <ScrollContainer
        onChange={onStartScroll}
        onReachStart={onScrollTop}
        opaque
        sections={[
          [<HeroBackground />, <HeroTop />],
        ]}
      />
    </main>
  );
}

export default memo(HomeContent);