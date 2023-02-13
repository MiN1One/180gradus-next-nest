import { IHomeBlock } from "@shared/types/home.types";
import { CSSProperties, memo } from "react";
import classes from './HomeBlock.module.scss';
import classNames from 'classnames';

interface HomeBlockProps {
  block: IHomeBlock;
}

interface CSSPropsWithVariables extends CSSProperties {
  '--coverImage': string;
}

export const HomeBlockTop = memo(function({ block }: HomeBlockProps) {
  return (
    <section 
      className={classNames(
        classes.heroBg, 
        { [classes.withBg]: Boolean(block.imageCover) }
      )}
      style={{
        backgroundImage: block.bgImage ? `url(${block.bgImage})` : undefined,
        backgroundColor: block.bgColor,
        '--coverImage': block.imageCover ? `url(${block.imageCover})` : undefined
      } as CSSPropsWithVariables}
    >
      <div className={classes.content}>
        {block.title.localeContent}
        {block.subtitle.localeContent}
      </div>
    </section>
  );
});

export const HomeBlockBottom = memo(function({ block }: HomeBlockProps) {
  return (
    <section 
      className={classNames(
        classes.heroCover, 
        { [classes.withBg]: Boolean(block.imageCover) }
      )}
      style={{
        backgroundImage: block.bgImage ? `url(${block.bgImage})` : undefined,
        backgroundColor: block.bgColor,
        '--coverImage': block.imageCover ? `url(${block.imageCover})` : undefined
      } as CSSPropsWithVariables}
    >
      <div className={classes.content}>
        {block.title.localeContent}
        {block.subtitle.localeContent}
      </div>
    </section>
  );
});