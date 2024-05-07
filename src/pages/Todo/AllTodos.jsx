import React from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useAllTodosQuery } from "../../redux/api/todoApiSlice";
import avatar from "../../assets/kshitish.jpg";
import { MdDelete,MdEdit } from "react-icons/md";

const AllTodos = () => {
  const { data: todos, isLoading } = useAllTodosQuery();
  return (
    <div className=" flex flex-col justify-center items-center h-full gap-0.5 p-1.5">
      {todos?.map((todo) => (
        <Card
          color="transparent"
          shadow={true}
          className="w-full xl:max-w-[40%] border border-gray-300 sm:max-w-[85%] mt-2 mb-2 shadow-lg"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 p-4"
          >
            <Avatar size="lg" variant="circular" src={avatar} alt="mine" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center">
                <Typography variant="h5" color="blue-gray">
                  <p className=" font-poppins text-xl font-bold text-[#22c55e] border border-gray-400 rounded-lg bg-[#dcfce7] border-transparent p-2">
                    {todo.title}
                  </p>
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              <p className=" font-poppins text-[16px] font-normal text-blue-600 p-4">
                {todo.desc}
              </p>
            </Typography>
            <Typography>
              <div className=" flex justify-between">
                <p className=" font-poppins p-4 text-[14px]">
                  <span className=" font-extrabold text-black text-[16px] ">
                    {" "}
                    Due Date :{" "}
                  </span>
                  {moment(todo.dueDate).format("Do MMMM YYYY")}
                </p>
                <div className=" flex justify-center items-center gap-2 mr-4">
                  <MdEdit size={24} color="blue"/>
                  <MdDelete size={24} color="red"/>
                </div>
              </div>
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AllTodos;
