import React from 'react';
import { useSprings, animated, to } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import '../css/Tictac.css';

const data = new Array(5).fill().map((_, index) => index);

const Tictac = () => {
  const [props, set] = useSprings(data.length, (index) => ({
    x: index * window.innerWidth,
    scale: 1,
    display: 'block',
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [xDelta], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 4) {
        const newIndex = xDir > 0 ? index - 1 : index + 1;
        // Remove the card from the DOM after swipe
        set((i) => (i === index ? { display: 'none' } : {}));
        set((i) => (i === newIndex ? { x: xDir > 0 ? -window.innerWidth : window.innerWidth, display: 'block' } : {}));
        cancel();
      }

      set((i) => {
        if (i < index - 1 || i > index + 1) return { display: 'none' };
        const x = (i - index) * window.innerWidth + (down ? xDelta : 0);
        const scale = down ? 1 - distance / window.innerWidth / 2 : 1;
        return { x, scale, display: 'block' };
      });
    }
  );

  return (
    <div>
      {props.map(({ x, scale, display }, index) => (
        <animated.div
          {...bind(index)}
          key={index}
          style={{
            display,
            transform: to([x, scale], (x, s) => `translate3d(${x}px,0,0) scale(${s})`),
          }}
          className="card"
        >
          Content {index + 1}
        </animated.div>
      ))}
    </div>
  );
};

export default Tictac;
