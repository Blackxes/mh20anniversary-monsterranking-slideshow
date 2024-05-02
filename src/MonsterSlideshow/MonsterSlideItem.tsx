/**
 * @Author Alexander Bassov Sat Mar 16 2024
 * @Email blackxes.dev@gmail.com
 */

import { animated, useSpring } from "@react-spring/web";
import { FunctionComponent, useMemo, useState } from "react";
import { Monster } from "./types";

interface MonsterSlideItem {
  monster: Monster;
}

const MonsterSlideItem: FunctionComponent<MonsterSlideItem> = ({ monster }) => {
  if (!monster.subSpecies && !monster.species) {
    return null;
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const usedName: string = (monster.subSpecies || monster.species)!;
  const parsedName = usedName.toLowerCase().replace(/\s|'|-/g, "_");
  const onImageLoaded = () => setImageLoaded(true);

  const imageInstance = useMemo(() => {
    const image = new Image();
    image.src =
      import.meta.env.VITE_URL_BASE +
      "images/monsters/" +
      (monster.imageName || parsedName) +
      ".webp";
    image.onload = onImageLoaded;

    return image;
  }, [parsedName]);

  const animatedImageStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 200,
    },
  });

  return (
    <animated.div
      className="monster-item flex flex-y full-height"
      // style={animationStyle}
    >
      <div className="flex place-center flex-grow">
        {!imageLoaded ? (
          <p className="subtle-text">Loading ..</p>
        ) : (
          <div className="monster-image-wrapper">
            <animated.img
              style={animatedImageStyle}
              className="monster-image"
              src={imageInstance.src}
              onLoad={onImageLoaded}
            />
          </div>
        )}
      </div>
      <div className="name-wrapper text-center">
        {!monster.subSpecies ? null : (
          <p className="name-subspecies">{monster.species}</p>
        )}
        <a
          className="species"
          href={"https://monsterhunter.fandom.com/wiki/" + usedName}
          target="_blank"
        >
          {usedName}
        </a>
      </div>
    </animated.div>
  );
};

export default MonsterSlideItem;
