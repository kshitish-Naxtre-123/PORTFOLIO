import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { Input, DatePicker } from "antd";
import dayjs from 'dayjs';
import {
  useCreateTodoMutation,
  useRecentTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../redux/api/todoApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Loader from "../../components/Loader";

const { TextArea } = Input;

const TodoPage = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todoDate, setTodoDate] = useState(null);
  const [btnText, setBtnText] = useState("Add Todo");
  const [btnColor, setBtnColor] = useState("indigo");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const {
    data: recentTodos,
    isLoading: isRecentTodoLoading,
    refetch,
  } = useRecentTodosQuery();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    refetch();
  }, []);

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
          refetch();
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
    console.log(todo.dueDate)
    setBtnText("Update Todo");
    setBtnColor("green");
    setTodoInput(todo.title);
    setTodoDesc(todo.desc);
    setTodoDate(dayjs(todo.dueDate));
    setEditingTodoId(todo._id);
    scrollToForm();
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
      <div className="flex justify-center  h-auto ">
        <Card className="xl:w-[50%] sm:w-[90%] w-[100%] xl:m-auto sm:m-0 ">
          <CardBody>
            <h1 className="font-poppins font-bold text-center text-2xl mb-4">
              Todo List
            </h1>
            <form
              ref={formRef}
              onSubmit={submitHandler}
              className=" border border-gray-400 p-4 rounded-xl shadow-xl"
            >
              <div className=" text-left font-poppins">
                <label htmlFor="todo title" className=" font-semibold">
                  {" "}
                  Title:
                </label>
                <Input
                  type="text"
                  placeholder="Enter your todo..."
                  className="mb-4 font-poppins text-[14px] shadow-md"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  style={{ padding: "10px", marginTop: "10px" }}
                />
              </div>
              <div className="text-left font-poppins">
                <label htmlFor="desc" className=" font-semibold ">
                  Description:
                </label>
                <TextArea
                  placeholder="Enter description of your todo here"
                  rows={4}
                  style={{ marginTop: "10px" }}
                  value={todoDesc}
                  onChange={(e) => setTodoDesc(e.target.value)}
                  className="font-poppins text-[14px] shadow-md"
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
                  value={todoDate ? todoDate : null}
                  onChange={(date) => {console.log(date); setTodoDate(date)}}
                  className="shadow-md"
                />
              </div>
              <div className="flex justify-start items-center">
                <Button
                  color={btnColor}
                  buttonType="filled"
                  size="regular"
                  block={false}
                  ripple="light"
                  className=" mt-6 shadow-md"
                  type="submit"
                >
                  {btnText}
                </Button>
              </div>
            </form>
            {isRecentTodoLoading ? (
              <div className=" flex justify-center items-center mt-6 py-2 px-2">
                <Loader />
              </div>
            ) : (
              <>
              {console.log(recentTodos)}
                {recentTodos?.map((todo) => (
                  <div
                    key={todo._id}
                    className=" font-poppins font-semibold border border-gray-400 p-2  text-left rounded-md shadow-md mt-5 mb-4"
                  >
                    <ul>
                      <li className=" flex flex-col">
                        <h2 className=" font-bold text-[#22c55e] text-[22px] border border-gray-400 rounded-lg pt-2 pb-2 pl-2  bg-[#dcfce7] border-transparent">
                          {todo.title}
                        </h2>
                        <pre className=" mt-2 mb-2 pl-2 font-poppins">{todo.desc}</pre>{" "}
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
              </>
            )}

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
