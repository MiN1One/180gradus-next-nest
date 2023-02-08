import { memo, useCallback, useEffect, useRef, useState } from "react";
import classes from './ScrollContainer.module.scss';
import { useGlobalContext } from "@client/contexts/GlobalContext";
import { getLimintNumber } from "@client/utils/number.utils";

interface ScrollContainerProps {
  sections: React.ReactNode[];
}

export function ScrollContainer(props: ScrollContainerProps) {
  const { sections } = props;
  const { cssVariables } = useGlobalContext();
  const [translate, setTranslate] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const touchStartPoint = useRef(0);
  const touching = useRef(false);
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

  const translateContent = useCallback(
    (scrollMargin: number) => {
      return new Promise(() => {
        const scrollingBack = scrollMargin <= 0;
    
        const currentSectionHeight = sectionHeights[activeSectionIndex];
        const viewHeight = window.innerHeight - cssVariables.headerHeight;

        const sectionReachedMax = currentSectionHeight == viewHeight;
        const sectionReachedMin = currentSectionHeight == 0;
    
        if (
          (
            scrollingBack && 
            activeSectionIndex === 0 && 
            sectionReachedMin
          ) ||
          (
            !scrollingBack && 
            activeSectionIndex === sectionHeights.length - 1 && 
            sectionReachedMax
          )
        ) {
          return;
        }
    
        const newSectionHeight = Math.max(
          Math.min(currentSectionHeight + scrollMargin, viewHeight), 0
        );
    
        const isNotLastSection = sectionHeights.length > activeSectionIndex + 1;
        const isNotFirstSection = activeSectionIndex > 0;
    
        const activeSectionTranslateMax = (activeSectionIndex + 1) * viewHeight;
        const canTranslate = translate < activeSectionTranslateMax;
        const newTranlateValue = translate + scrollMargin;
    
    
        const shouldTranslate = (
          (scrollingBack || sectionReachedMax) &&
          isNotLastSection && 
          sectionReachedMax
        );
    
        if (
          !sectionReachedMax || 
          (scrollingBack && newTranlateValue <= activeSectionIndex * viewHeight)
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
      });
    },
    [activeSectionIndex, sectionHeights, cssVariables, translate]
  );

  const onMouseWheel = useCallback(
    (e: any) => {
      translateContent(
        getLimintNumber(e.deltaY ?? e.wheelDeltaY, 10)
      );
    },
    [translateContent]
  );

  const onTouchMove = useCallback((e: globalThis.TouchEvent) => {
    if (!touching.current) return;
    const touchMoveLength = touchStartPoint.current - e.changedTouches[0].clientY;
    translateContent(
      getLimintNumber(touchMoveLength, 50)
    );
  }, [translateContent]);

  const onTouchStart = useCallback((e: globalThis.TouchEvent) => {
    touching.current = true;
    touchStartPoint.current = e.changedTouches[0].clientY;
  }, []);
  
  const onTouchEnd = useCallback(() => {
    touching.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('mousewheel', onMouseWheel);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousewheel', onMouseWheel);
      window.removeEventListener('touchmove', onMouseWheel);
    };
  }, [onMouseWheel, onTouchMove]);

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