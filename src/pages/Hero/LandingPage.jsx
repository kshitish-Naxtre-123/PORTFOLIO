import React from "react";
import Hero from "../../assets/kshitish.jpg";
const LandingPage = () => {
  return (
    <>
      <div className=" w-full bg-black">
        <div className=" mx-auto max-w-screen-xl h-auto mt-6 p-4 flex xl:flex-row lg:flex-row sm:flex-col flex-col xl:justify-between lg:justify-between justify-center items-center ">
          <div className=" xl:max-w-[50%] lg:max-w-[50%] sm:w-full  w-full flex flex-col justify-center">
            <h1 className=" font-extrabold text-[44px] text-white mb-2 font-poppins">
              Kshitish Kumar
            </h1>
            <p className=" text-[15px] text-white font-poppins mb-2">
              Experienced MERN stack developer proficient in building robust web
              applications. Skilled in MongoDB, Express.js, React.js, and
              Node.js, with expertise in creating dynamic and responsive user
              interfaces. Passionate about problem-solving and clean code.{" "}
            </p>
            <button className=" text-[16px]  bg-blue-400 rounded-lg w-fit mt-2 px-4 py-3 text-white font-bold font-poppins">
              Let's get Started
            </button>
          </div>
          <div>
            <img
              src={Hero}
              alt="hero image"
              className=" w-[300px] h-[310px]  rounded-full  border-transparent mt-8 xl:mt-0 "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
