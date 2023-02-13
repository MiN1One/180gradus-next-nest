import { useHomeContext } from "@client/contexts/HomeContext";
import { memo, useCallback, useMemo } from "react";
import { HomeBlockTop, HomeBlockBottom } from "../HomeBlock/HomeBlock";
import { ScrollContainer } from "../ScrollContainer/ScrollContainer";
import classes from './HomeSections.module.scss';

function HomeSections() {
  const { setScrollStart, homeSettings, scrollStart } = useHomeContext();

  const onStartScroll = useCallback(
    (height: number, _: number, index: number) => {
      if (height > 0 || index > 0) {
        setScrollStart(true);
      }
    }, []
  );

  const sectionEls = useMemo(() => {
    return homeSettings.sections
      .sort((a, b) => a.order - b.order)
      .map(section => {
        return [
          <HomeBlockTop block={section.blockTop} />,
          <HomeBlockBottom block={section.blockBottom} />
        ] as [React.ReactNode, React.ReactNode];
      });
  }, [homeSettings]);

  const onScrollTop = useCallback(() => {
    setScrollStart(false);
  }, []);

  return (
    <main 
      data-scroll-active={scrollStart.toString()} 
      className={classes.sections}
    >
      <ScrollContainer
        onChange={onStartScroll}
        onReachStart={onScrollTop}
        opaque
        sections={sectionEls}
      />
    </main>
  );
}

export default memo(HomeSections);