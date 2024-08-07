import React, { useState } from 'react'
import "./index.scss"
import { LOAIGHE } from "../../constant/index";
export default function Chair(props:any) {
  const [isSelected, setIsSelected] = useState(false);

  const populateClass = () => {
    let defaultClass = 'seat';

    if (props.item.LOAIGHE === LOAIGHE.Vip) {
      defaultClass += " Vip";
    }

    if (isSelected) {
      defaultClass += " selecting";
    }

    if (props.item.daDat) {
      defaultClass += " daDat";
    }

    return defaultClass;
  };
  return (
    <button
      key={props.item.tenGhe}
      disabled={props.item.daDat}
      onClick={() => {
        setIsSelected(!isSelected);
        props.handleSelect(props.item);
      }}
      className={populateClass()}>
      {props.item.tenGhe}
    </button >
  );
}

