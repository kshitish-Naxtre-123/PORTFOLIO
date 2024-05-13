import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  useAllTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../redux/api/todoApiSlice";
import avatar from "../../assets/kshitish.jpg";
import { MdDelete, MdEdit } from "react-icons/md";
import { Button, DatePicker, Input, Modal } from "antd";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const { TextArea } = Input;

const AllTodos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const { data: todos, isLoading, refetch } = useAllTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    refetch();
  }, []);

  const showModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    await updateTodo({ id: selectedTodo._id, updatedTodo: selectedTodo });
    setSelectedTodo(null);
    toast.success("Todo updated successfully");
    refetch();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleModalChange = (key, value) => {
    setSelectedTodo({
      ...selectedTodo,
      [key]: value,
    });
  };

  const handleDeleteTodo = async (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteTodo(id);
            toast.success("Todo deleted successfully");
            refetch();
          } catch (error) {
            toast.error("Failed to delete Todo!");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  return (
    <div className=" flex flex-col justify-center items-center h-full gap-0.5 p-4">
      {todos?.map((todo) => (
        <Card
          key={todo._id}
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
                  <MdEdit
                    size={24}
                    color="blue"
                    onClick={() => showModal(todo)}
                  />
                  <MdDelete
                    size={24}
                    color="red"
                    onClick={() => handleDeleteTodo(todo._id)}
                  />
                </div>
              </div>
            </Typography>
          </CardBody>
        </Card>
      ))}

      <Modal
        title={
          <span className=" font-poppins text-xl text-blue-500 font-extrabold  flex justify-center items-center">
            Update Todo
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        okText="Update"
        okButtonProps={{
          style: {
            fontFamily: "poppins",
            background: "#32de84",
            borderColor: "green",
            border: "transparent",
          },
        }}
        onCancel={handleCancel}
        cancelButtonProps={{
          style: {
            fontFamily: "poppins",
            background: "#94a3b8",
            color: "white",
            border: "transparent",
          },
        }}
        centered
      >
        <form>
          <div className=" text-left font-poppins">
            <label htmlFor="todo title" className=" font-semibold">
              {" "}
              Title:
            </label>
            <Input
              type="text"
              placeholder="Enter your todo..."
              className="mb-4 font-poppins text-[14px] shadow-md"
              style={{ padding: "10px", marginTop: "10px" }}
              value={selectedTodo ? selectedTodo.title : ""}
              onChange={(e) => handleModalChange("title", e.target.value)}
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
              className="font-poppins text-[14px] shadow-md"
              value={selectedTodo ? selectedTodo.desc : ""}
              onChange={(e) => handleModalChange("desc", e.target.value)}
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
              className="shadow-md"
              value={selectedTodo ? moment(selectedTodo.dueDate) : null}
              onChange={(e) => handleModalChange("dueDate", e.target.value)}
            />
          </div>{" "}
        </form>
      </Modal>
    </div>
  );
};

export default AllTodos;
