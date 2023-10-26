import React from 'react';
import { FaStar } from "react-icons/fa";

const Star = ({selected = false, onSelect = f => f}) => (
  // onSelect의 디폴트 값 'f => f'는 인자로 받은 값을 그대로 돌려주는 일 외에 아무 일도 않는 가짜 함수다. onSelect에 함수를 넣지 않은 경우 오류를 방지하기 위한 것이라고 할 수 있다.
  <FaStar color = {selected ? "red" : "#ccc"} onClick={onSelect}/>
);

const createArray = (length) => [...Array(length)];

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate = f => f }){
  return (
    <div>
      {createArray(totalStars).map((_,i) => (
        <Star 
          key={i} 
          selected={selectedStars > i} 
          onSelect={() => onRate(i + 1)} />
      ))}
    </div>
  );
}