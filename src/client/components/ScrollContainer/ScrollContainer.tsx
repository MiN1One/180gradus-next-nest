import { memo, useCallback, useEffect, useMemo, useState } from "react";
import classes from './ScrollContainer.module.scss';
import { useGlobalContext } from "@client/contexts/GlobalContext";

interface ScrollContainerProps {
  sections: React.ReactNode[];
}

export function ScrollContainer(props: ScrollContainerProps) {
  const { sections } = props;
  const { cssVariables } = useGlobalContext();
  const [translate, setTranslate] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [sectionHeights, setSectionHeights] = useState(
    sections.map(() => 0)
  );

  const changeSectionHeight = useCallback(
    (index: number, height: number) => {
      setSectionHeights(prev => {
        const newList = [...prev];
        newList[index] = height;
        return newList;
      });
    }, []
  );

  useEffect(() => {
    if (sectionHeights.length) {
      setSectionHeights(sections.map(() => 0));
    }
  }, [sections.length]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.removeProperty('overflow');
    };
  }, []);

  const onMouseWheel = useCallback(
    (e: any) => {
      const scrollMargin = e.deltaY ?? e.wheelDeltaY;
      const currentSectionHeight = sectionHeights[activeSectionIndex];
      const viewHeight = window.innerHeight - cssVariables.headerHeight;

      const newSectionHeight = Math.max(
        Math.min(currentSectionHeight + scrollMargin, viewHeight), 0
      );

      const isNotLastSection = sectionHeights.length > activeSectionIndex + 1;
      const isNotFirstSection = activeSectionIndex > 0;

      const sectionReachedMax = currentSectionHeight == viewHeight;
      const sectionReachedMin = currentSectionHeight == 0;

      const activeSectionTranslateMax = (activeSectionIndex + 1) * viewHeight;
      const canTranslate = translate < activeSectionTranslateMax;

      const scrollingBack = scrollMargin <= 0;
      
      const shouldTranslate = (
        (scrollingBack || sectionReachedMax) &&
        isNotLastSection && 
        sectionReachedMax
      );

      if (
        !sectionReachedMax || 
        (scrollingBack && translate === activeSectionIndex * viewHeight)
      ) {
        changeSectionHeight(activeSectionIndex, newSectionHeight);
      }
        
      if (shouldTranslate) {
        setTranslate(p => Math.max(
          Math.min(p + scrollMargin, activeSectionTranslateMax), 0
        ));
      }

      setActiveSectionIndex(p => {
        if (isNotLastSection && sectionReachedMax && !canTranslate) {
          return p + 1;
        } else if (isNotFirstSection && sectionReachedMin ) {
          return p - 1;
        }
        return p;
      });
    }, 
    [activeSectionIndex, sectionHeights, cssVariables, translate]
  );

  useEffect(() => {
    window.addEventListener('mousewheel', onMouseWheel);
    return () => {
      window.removeEventListener('mousewheel', onMouseWheel);
    };
  }, [onMouseWheel]);

  const sectionEls = sections.map((section, index) => {
    return (
      <div key={index} className={classes.section}>
        <div 
          style={{ height: sectionHeights[index] + 'px' }}
          className={classes.sectionContent}
        >
          {section}
        </div>
      </div>
    );
  });

  return (
    <div className={classes.container}>
      <div 
        className={classes.content}
        style={{ transform: `translateY(-${translate}px)` }}
      >
        {sectionEls}
      </div>
    </div>
  );
}

export default memo(ScrollContainer);