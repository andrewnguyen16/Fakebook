import { Fireworks } from "fireworks/lib/react";

const Firework = () => {
  let props = {
    count: 3,
    interval: 1000,
    colors: ["#cc3333", "#4CAF50", "#81C784"],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 450 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0),
    }),
  };
  return (
    <div>
      <Fireworks {...props} />
    </div>
  );
};

export default Firework;
