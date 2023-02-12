import { IHomeBlock } from "@shared/types/home.types";
import { memo } from "react";
import classes from './HomeBlock.module.scss';

interface HomeBlockProps {
  block: IHomeBlock;
}

export const HomeBlockTop = memo(function({ block }: HomeBlockProps) {
  return (
    <section 
      className={classes.heroBg} 
      style={block.imageCover 
        ? { backgroundImage: `url(${block.imageCover})` } 
        : undefined
      }
    >
      <div className={classes.content}>
        <h1>
          {block.title.localeContent}
        </h1>
      </div>
    </section>
  );
});

export const HomeBlockBottom = memo(function({ block }: HomeBlockProps) {
  return (
    <section 
      className={classes.heroTop}
      style={block.imageCover 
        ? { backgroundImage: `url(${block.imageCover})` } 
        : undefined
      }
    >
      {block.title.localeContent}
    </section>
  );
});