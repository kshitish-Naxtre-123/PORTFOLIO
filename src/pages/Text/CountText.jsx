import React, { useState } from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;
const CountText = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const countWord = () => {
    const words = text.trim().split(/\s+/).length;
    setWordCount(words);
  };
  const countLetter = () => {
    const letters = text.replace(/[^a-zA-Z]/g, "").length;
    setLetterCount(letters);
  };
  return (
    <div className="flex justify-center mt-8 p-4 xl:mt-8 flex-col gap-3 font-poppins">
      <div className=" sm:w-full flex flex-col ">
        <label htmlFor="label" className=" mb-2  text-xl font-extrabold">
          Text:
        </label>
        <TextArea
          rows={4}
          value={text}
          onChange={handleTextChange}
          className=" xl:w-[50%] l:w-[40%] sm:w-[100%] text-[16px] "
          placeholder="Enter Text to Count No of Word & Letter"
        />
      </div>
      <div className=" flex gap-2 w-[100%] justify-between">
        <button
       className=" text-[14px] btn btn-info text-white font-semibold w-[180px] pt-3 pb-3 pl-1 pr-1"
          onClick={countWord}
        >
          {" "}
          Count No Of Word
        </button>
        <div className=" flex flex-row gap-2 items-center">
          <span className=" text-[14px]">Total Words:</span>
          <Input className=" w-[50%] h-[100%]" value={wordCount} />
        </div>
      </div>
      <div className=" flex gap-2 w-[100%] justify-between">
        <button
          className=" text-[14px] btn btn-info text-white font-semibold w-[180px] pt-3 pb-3 pl-1 pr-1"
          onClick={countLetter}
        >
          {" "}
          Count No Of Letter
        </button>
        <div className=" flex flex-row gap-2 items-center">
          <span className=" text-[14px]">Total Letters:</span>
          <Input className=" w-[50%] h-[100%]" value={letterCount} />
        </div>
      </div>
    </div>
  );
};

export default CountText;
