/**
 * @Author Alexander Bassov Sat Mar 16 2024
 * @Email blackxes.dev@gmail.com
 */

import { animated, useSpring } from "@react-spring/web";
import { CSSProperties, FunctionComponent, useState } from "react";
import monsters from "../data/monsters.json";
import BackgroundImage from "./BackgroundImage";
import EditableMonsterRank from "./EditableMonsterRank";
import MonsterSlideItem from "./MonsterSlideItem";
import SlideControl from "./SlideControl";
import { getClosestValidRank } from "./functions";
import "./monsterslide.css";

interface MonsterSlide {}

const MonsterSlide: FunctionComponent<MonsterSlide> = () => {
  // const [currentLookingRank, setCurrentLookingRank] = useState(monsters.length);
  const [currentLookingRank, setCurrentLookingRank] = useState(monsters.length);
  const [] = useState(false);
  const filteredMonsters = monsters.filter((m) => m.rank == currentLookingRank);
  const [skipEmptyRanks, setSkipEmptyRanks] = useState(false);

  const onChangedRank = (newRank: number) => setCurrentLookingRank(newRank);
  const onBackwards = () =>
    setCurrentLookingRank(() =>
      getClosestValidRank(currentLookingRank, monsters)
    );
  const onForwards = () =>
    setCurrentLookingRank(() =>
      getClosestValidRank(currentLookingRank, monsters, true)
    );
  const toFront = () => setCurrentLookingRank(monsters.length);
  const toEnd = () => setCurrentLookingRank(1);
  const onToggleSkipEmptyRanks = () => setSkipEmptyRanks(!skipEmptyRanks);

  const isFirstRank = () => currentLookingRank == 1;
  const isLastRank = () => currentLookingRank == monsters.length;

  const [fromLeftAnimatedStyle] = useSpring(
    () => ({
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0)" },
    }),
    [currentLookingRank]
  );

  const cssVariables = {
    "--monsters-count": filteredMonsters.length,
  } as CSSProperties;

  return (
    <div
      className="static-bg-container monster-slide flex flex-y flex-gap-small place-center"
      style={cssVariables}
    >
      <BackgroundImage />
      <div className="flex flex-gap">
        <EditableMonsterRank
          currentRank={currentLookingRank}
          min={0}
          max={monsters.length}
          onChanged={onChangedRank}
        />
      </div>
      <animated.div
        style={fromLeftAnimatedStyle}
        className="monsters-listing full-width grid flex-grow flex-gap"
      >
        {!filteredMonsters.length ? (
          <p className="place-self-center subtle-text">
            No Monster on this rank
          </p>
        ) : (
          filteredMonsters.map((monster) => (
            <MonsterSlideItem key={monster.species} monster={monster} />
          ))
        )}
      </animated.div>
      <div className="flex flex-gap">
        <button
          type="button"
          className="rank-control rank-control-to-front"
          onClick={toFront}
          disabled={isFirstRank()}
        >
          &#171;
        </button>
        <div className="slide-controls flex flex-gap place-center">
          <SlideControl
            onClicked={onBackwards}
            direction="backwards"
            disabled={isFirstRank()}
          />
          <SlideControl
            onClicked={onForwards}
            direction="forwards"
            disabled={isLastRank()}
          />
        </div>
        <button
          className="skip-empty-ranks hover-pointer"
          data-is-active={skipEmptyRanks}
          onClick={onToggleSkipEmptyRanks}
          disabled={isLastRank()}
        >
          Skip Empty Ranks
        </button>

        <button
          type="button"
          className="rank-control rank-control-to-end"
          onClick={toEnd}
        >
          &#187;
        </button>
      </div>
    </div>
  );
};

export default MonsterSlide;
