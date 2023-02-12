import { memo, useCallback, useEffect, useRef, useState } from "react";
import classes from './ScrollContainer.module.scss';
import { getLimintNumber } from "@client/utils/number.utils";

interface ScrollContainerProps {
  sections: [React.ReactNode, React.ReactNode][];
  onReachEnd?: () => void;
  onReachStart?: () => void;
  onChange?: (
    currentSectionHeight: number, 
    translate: number,
    activeSectionIndex: number
  ) => void;
  opaque?: boolean;
}

const DESKTOP_MAX_SCROLL_SPEED = 20;
// const MOBILE_MAX_SCROLL_SPEED = 15;

export function ScrollContainer(props: ScrollContainerProps) {
  const {
    sections,
    onReachEnd,
    opaque,
    onReachStart,
    onChange,
  } = props;
  const [translate, setTranslate] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const touchStartPoint = useRef(0);
  const touching = useRef(false);
  const [sectionHeights, setSectionHeights] = useState(
    sections.map(() => 0)
  );
  const [renderedCmp, setRenderedCmp] = useState(false);

  useEffect(() => {
    setRenderedCmp(true);
  }, []);

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
        const viewHeight = window.innerHeight;

        const isLastSection = activeSectionIndex == sectionHeights.length - 1;
        const isFirstSection = activeSectionIndex == 0;

        const sectionReachedMax = currentSectionHeight == viewHeight;
        const sectionReachedMin = currentSectionHeight == 0;

        if (
          isLastSection && 
          sectionReachedMax && 
          typeof onReachEnd === 'function'
        ) {
          onReachEnd();
        } else if (
          isFirstSection && 
          sectionReachedMin && 
          typeof onReachStart === 'function'
        ) {
          onReachStart();
        }
    
        const newSectionHeight = Math.max(
          Math.min(currentSectionHeight + scrollMargin, viewHeight), 0
        );
    
        const activeSectionTranslateMax = (activeSectionIndex + 1) * viewHeight;
        const canTranslate = translate < activeSectionTranslateMax;
        const newTranlateValue = translate + scrollMargin;
    
        const shouldTranslate = (
          (scrollingBack || sectionReachedMax) &&
          !isLastSection && 
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

        if (typeof onChange === 'function') {
          onChange(newSectionHeight, newTranlateValue, activeSectionIndex);
        }
    
        setActiveSectionIndex(p => {
          if (!isLastSection && sectionReachedMax && !canTranslate) {
            return p + 1;
          } else if (!isFirstSection && sectionReachedMin ) {
            return p - 1;
          }
          return p;
        });
      });
    },
    [
      activeSectionIndex, 
      sectionHeights, 
      translate, 
      onReachEnd,
      onReachStart,
      onChange,
    ]
  );

  const onMouseWheel = useCallback((e: any) => {
    translateContent(
      getLimintNumber(
        e.deltaY ?? e.wheelDeltaY, 
        DESKTOP_MAX_SCROLL_SPEED
      )
    );
  }, [translateContent]);

  const onTouchMove = useCallback((e: globalThis.TouchEvent) => {
    if (!touching.current) return;
    const touchMoveLength = touchStartPoint.current - e.changedTouches[0].clientY;
    translateContent(touchMoveLength);
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
    const [contentBackground, contentTop] = section;
    const height = sectionHeights[index];
    return (
      <div key={index} className={classes.section}>
        {contentBackground}
        <div 
          style={
            typeof window !== 'undefined' && renderedCmp
              ? {
                height: height + 'px',
                opacity: 
                  opaque
                    ? height / window.innerHeight 
                    : undefined
              } 
              : undefined
          }
          className={classes.sectionContent}
        >
          {contentTop}
        </div>
      </div>
    );
  });

  return (
    <div className={classes.container}>
      <div 
        className={classes.content}
        style={{ transform: `translateY(-${translate}px)`, }}
      >
        {sectionEls}
      </div>
    </div>
  );
}

export default memo(ScrollContainer);