import { memo } from "react";
import classes from './Hero.module.scss';

export const HeroBackground = memo(function() {

  return (
    <section className={classes.heroBg}>
      <div className="container">
        <div className={classes.content}>
          Hello!
        </div>
      </div>
    </section>
  );
});

export const HeroTop = memo(function HeroTop() {

  return (
    <section className={classes.heroTop}>
      
    </section>
  );
})