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
const AllTodos = () => {
  const { data: todos, isLoading } = useAllTodosQuery();
  return (
    <div className=" flex flex-col justify-center items-center h-full gap-4">
      {todos?.map((todo) => (
        <Card
          color="transparent"
          shadow={true}
          className="w-full max-w-[26rem] border border-gray-300"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src={avatar}
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center">
                <Typography variant="h5" color="blue-gray">
                  {todo.title}
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>{todo.desc}</Typography>
            <Typography>
              Due Date: {moment(todo.dueDate).format("Do MMMM YYYY")}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default AllTodos;
