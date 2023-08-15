import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const NewUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
  });

  const {
    addUser,
    editing,
    setEditing,
    editingIndex,
    setEditingIndex,
    editUser,
    usersArray,
  } = useContext(UserContext);

  const navigate = useNavigate();

  // handle save
  const handleSave = (e) => {
    e.preventDefault();
    if (editing && editingIndex !== null) {
      editUser(editingIndex, user);
    } else {
      addUser(e, user, setUser);
    }

    setUser({
      name: "",
      email: "",
      number: "",
    });
    setEditing(false);
    setEditingIndex(null);
    navigate("/");
  };

  //handle onchange of all inputs
  const handleOnChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editing && editingIndex !== null) {
      setUser(usersArray[editingIndex]);
    } else {
      setUser({
        name: "",
        email: "",
        number: "",
      });
    }
  }, [editing, editingIndex]);

  return (
    <div className="mt-40">
      {/* title box start */}
      <div className="flex items-center mx-80 mt-40">
        <div className="font-normal text-5xl ">ADD NEW USER</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-20"
          onClick={() => {
            navigate("/");
          }}
        >
          GO BACK
        </button>
      </div>
      {/* title box end */}

      {/* form to create a new user start  */}
      <div className="my-20">
        <form className="flex flex-col ml-80 w-80 " onSubmit={handleSave}>
          <label className="font-bold">Name</label>
          <input
            type="text"
            required={true}
            name="name"
            placeholder="enter your name"
            className="bg-slate-100 h-8 mb-5 px-4 font-bold"
            onChange={handleOnChange}
            value={user.name}
          />
          <label className="font-bold">Email</label>
          <input
            type="email"
            name="email"
            required={true}
            placeholder="enter your email"
            className="bg-slate-100 h-8 mb-5 px-4 font-bold"
            onChange={handleOnChange}
            value={user.email}
          />
          <label className="font-bold">Mobile No.</label>
          <input
            type="text"
            name="number"
            required={true}
            placeholder="enter mobile number"
            className="bg-slate-100 h-8 mb-5 px-4 font-bold"
            onChange={handleOnChange}
            value={user.number}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            SAVE
          </button>
        </form>
      </div>
      {/* form to create a new user end  */}
    </div>
  );
};

export default NewUser;
