import React, { useEffect, useState } from "react";
import { Breadcrumbs, Card, CardBody, Button } from "@material-tailwind/react";
import { Input, DatePicker } from "antd";
import {
  useCreateTodoMutation,
  useRecentTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../redux/api/todoApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const { TextArea } = Input;

const TodoPage = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todoDate, setTodoDate] = useState(null);
  const [btnText, setBtnText] = useState("Add Todo");
  const [btnColor, setBtnColor] = useState("indigo");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const navigate = useNavigate();

  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const {
    data: recentTodos,
    isLoading: isRecentTodoLoading,
    refetch,
  } = useRecentTodosQuery();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    try {
      if (editingTodoId) {
        const { data } = await updateTodo({
          id: editingTodoId,
          updatedTodo: { title: todoInput, desc: todoDesc, dueDate: todoDate },
        });
        if (data) {
          toast.success("Todo is updated successfully");
          setBtnText("Add Todo");
          setBtnColor("indigo");
          setEditingTodoId(null);
        }
      } else {
        const { data } = await createTodo({
          title: todoInput,
          desc: todoDesc,
          dueDate: todoDate,
        });
        if (data) {
          toast.success("Todo is created successfully");
        }
      }
      setTodoInput("");
      setTodoDesc("");
      setTodoDate(null);
      refetch();
    } catch (error) {
      toast.error("Failed to save todo");
    }
  };

  const handleEdit = (todo) => {
    setBtnText("Update Todo");
    setBtnColor("green");
    setTodoInput(todo.title);
    setTodoDesc(todo.desc);
    setTodoDate(moment(todo.dueDate));
    setEditingTodoId(todo._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Todo is deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };
  return (
    <>
      <Breadcrumbs>
        <a href="#" className="opacity-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </a>
        <a href="/" className="opacity-60">
          <span>pages</span>
        </a>
        <a href="/todo">Todo-section</a>
      </Breadcrumbs>
      <div className="flex justify-center  h-auto">
        <Card className="w-full ">
          <CardBody>
            <h1 className="font-poppins font-bold text-center text-2xl mb-4">
              Todo List
            </h1>
            <form onSubmit={submitHandler}>
              <div className=" text-left font-poppins">
                <label htmlFor="todo title" className=" font-semibold">
                  {" "}
                  Title:
                </label>
                <Input
                  type="text"
                  placeholder="Enter your todo..."
                  className="mb-4 font-poppins text-[14px]"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  style={{ padding: "10px", marginTop: "10px" }}
                />
              </div>
              <div className="text-left font-poppins">
                <label htmlFor="desc" className=" font-semibold">
                  Description:
                </label>
                <TextArea
                  placeholder="Enter description of your todo here"
                  rows={4}
                  style={{ marginTop: "10px" }}
                  value={todoDesc}
                  onChange={(e) => setTodoDesc(e.target.value)}
                  className="font-poppins text-[14px]"
                />
              </div>
              <div className="text-left font-poppins mt-4 flex flex-col">
                <label htmlFor="desc" className=" font-semibold">
                  Due Date:
                </label>
                <DatePicker
                  placeholder="Select date"
                  style={{ marginTop: "10px", width: "50%" }}
                  size="large"
                  value={todoDate}
                  onChange={(date) => setTodoDate(date)}
                />
              </div>
              <div className="flex justify-end items-center">
                <Button
                  color={btnColor}
                  buttonType="filled"
                  size="regular"
                  block={false}
                  ripple="light"
                  className=" mt-6"
                  type="submit"
                >
                  {btnText}
                </Button>
              </div>
            </form>

            {recentTodos?.map((todo) => (
              <div
                key={todo.id}
                className=" font-poppins font-semibold border border-gray-400 p-5  text-left rounded-md shadow-md mt-5 mb-4"
              >
                <ul>
                  <li className=" flex flex-col">
                    <h2 className=" font-bold text-[#22c55e] text-[22px] border border-gray-400 rounded-lg pt-2 pb-2 pl-2  bg-[#dcfce7] border-transparent">
                      {todo.title}
                    </h2>
                    <p className=" mt-2 mb-2 pl-2 ">{todo.desc}</p>{" "}
                    <div className=" mt-2 mb-0 flex  justify-between">
                      <p className=" text-sm font-normal ">
                        {" "}
                        <span className=" font-extrabold text-black text-[14px] pl-2">
                          Due Date:
                        </span>{" "}
                        {moment(todo.dueDate).format("Do MMMM YYYY")}
                      </p>
                      <div className=" flex flex-row gap-3">
                        <MdEdit
                          size={24}
                          color="blue"
                          onClick={() => handleEdit(todo)}
                        />
                        <MdDelete
                          size={24}
                          color="red"
                          onClick={() => handleDelete(todo._id)}
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
            <Button
              onClick={() => navigate("/show-all-todos")}
              className=" text-[20px] mt-12 font-poppins "
              fullWidth
              style={{ textTransform: "none" }}
            >
              Show All Todo
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default TodoPage;
