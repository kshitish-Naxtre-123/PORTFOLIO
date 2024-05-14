import React, { useState } from "react";
import { Input, Select, message } from "antd";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { useCreateContactMutation } from "../redux/api/contactApiSlice";
import { toast } from "react-toastify";
const { Option } = Select;
const { TextArea } = Input;
const ContactForm = () => {
  const [createContact] = useCreateContactMutation();

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    gender: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const resposne = await createContact(contactData);
      if (resposne.error) {
        toast.error("failed to submit contact form");
      } else {
        toast.success("contact form sent successfully, Thank You :)");
        setContactData({
          name: "",
          email: "",
          gender: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Failed to submit contact form");
    }
  };

  return (
    <>
      <div className="flex justify-center  h-auto ">
        <Card className="xl:w-[50%] sm:w-[90%] w-[100%] xl:m-auto sm:m-0 mt-2 ">
          <CardBody>
            <h1 className="font-poppins font-extrabold text-center text-3xl mb-4 text-black">
              Get In Touch
            </h1>
            <p className=" font-poppins text-center ">
              Feel free to reach out! Whether you have a project idea, a
              question, or just want to say hello, I'd love to hear from you.
              Send me a message and let's connect!
            </p>
            <form
              className=" border border-gray-400 p-4 rounded-xl shadow-xl mt-4"
              onSubmit={submitHandler}
            >
              <div className=" text-left font-poppins">
                <label htmlFor="todo title" className=" font-semibold">
                  {" "}
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  className="mb-4 font-poppins text-[14px] shadow-md"
                  style={{ padding: "10px", marginTop: "10px" }}
                  name="name"
                  value={contactData?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className=" text-left font-poppins">
                <label htmlFor="todo title" className=" font-semibold">
                  {" "}
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your mail-id"
                  className="mb-4 font-poppins text-[14px] shadow-md"
                  style={{ padding: "10px", marginTop: "10px" }}
                  name="email"
                  value={contactData?.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-left font-poppins mb-4 flex flex-col">
                <label htmlFor="gender" className="font-semibold">
                  Gender
                </label>
                <Select
                  className="font-poppins text-[14px] shadow-md xl:w-[60%] w-[100%] lg:w-[60%] h-[44px] mt-[10px]"
                  // style={{ width: "60%", height: "44px", marginTop: "10px" }}
                  value={contactData.gender}
                  onChange={(value) =>
                    handleInputChange({ target: { name: "gender", value } })
                  }
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </div>
              <div className=" text-left font-poppins">
                <label htmlFor="todo title" className=" font-semibold">
                  {" "}
                  Message
                </label>
                <TextArea
                  placeholder="Enter Message ...."
                  rows={4}
                  className="mb-4 font-poppins text-[14px] shadow-md"
                  style={{ padding: "10px", marginTop: "10px" }}
                  name="message"
                  value={contactData?.message}
                  onChange={handleInputChange}
                />
              </div>

              <Button
                // onClick={() => navigate("/show-all-todos")}
                className=" text-[20px] mt-2 font-poppins "
                fullWidth
                style={{ textTransform: "none" }}
                color="green"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ContactForm;
