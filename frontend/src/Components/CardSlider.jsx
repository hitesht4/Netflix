import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from "./styles/cardslider.module.css";
import Card from "./Card";

const CardSlider = ({ title, data }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef(0);

  const handleDirection = (direction) => {
    console.log(listRef, direction);
    let distance = listRef.current.getBoundingClientRect().x - 70;

    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${300 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-300 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div className={styles.Container}>
      <h1>{title}</h1>

      <div className={styles.wrapper}>
        <div className={styles.slider_action_left}>
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>

        <div className={styles.slider} ref={listRef}>
          {data.map((item, index) => (
            <Card key={index} movie={item} index={index} />
          ))}
        </div>

        <div className={styles.slider_action_right}>
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CardSlider);
