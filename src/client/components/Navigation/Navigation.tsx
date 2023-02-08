import { memo, useEffect, useMemo, useRef } from "react";
import classes from './Navigation.module.scss';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from "@client/contexts/GlobalContext";
import Link from "next/link";
import { RxStar } from 'react-icons/rx';
import { BiCart } from 'react-icons/bi';
import { useHomeContext } from "@client/contexts/HomeContext";
import classNames from 'classnames';

function Navigation() {
  const { t } = useTranslation();
  const { scrollStart } = useHomeContext();
  const headerRef = useRef<HTMLHeadElement>(null);
  const { 
    headData: { headerData, generalData },
    setCssVariables,
    cssVariables,
    media
  } = useGlobalContext();

  useEffect(() => {
    setCssVariables(prev => ({
      ...prev,
      headerHeight: headerRef.current.offsetHeight
    }));
  }, [media]);

  const navigationItemEls = useMemo(() => {
    return headerData.links.map((el, index) => {
      const label = t(el.value);
      return (
        <li
          key={el.value || index}
          aria-label={label}
          className={classes.item}
        >
          <Link href={el.url} title={label}>
            {label}
          </Link>
        </li>
      );
    });
  }, [headerData]);

  return (
    <header 
      ref={headerRef} 
      style={
        scrollStart 
          ? { transform: `translateY(-${cssVariables.headerHeight}px` } 
          : undefined
      }
      className={classes.navigation}
    >
      <div className="container">
        <nav className={classes.content}>
          <div className={classes.group}>
            <Link href="/" title={generalData?.description}>
              <figure className={classes.logo}>
                <img 
                  alt={generalData?.description} 
                  src={headerData.logo} 
                  width="100%" 
                  height="auto"
                />
              </figure>
            </Link>
            <ul className={classes.list}>
              {navigationItemEls}
            </ul>
          </div>
          <div className={classes.list}>
            {headerData.showFavorites && (
              <button title={t('favorites')} className={classes.item}>
                <RxStar />
              </button>
            )}
            {headerData.showCart && (
              <button title={t('cart')} className={classes.item}>
                <BiCart />
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default memo(Navigation);