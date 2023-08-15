import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    usersArray,
    deleteUser,
    editUser,
    editing,
    setEditing,
    editingIndex,
    setEditingIndex,
  } = useContext(UserContext);

  //handle delete
  const handleDelete = (index) => {
    deleteUser(index);
  };

  //handle edit
  const handleEdit = (user, index) => {
    setEditing(true);
    setEditingIndex(index);
    navigate("/newuser");
  };

  return (
    <div>
      <div className="mt-40">
        {/* title box start */}
        <div className="flex items-center ml-80 mt-40">
          <div className="font-normal text-5xl ">LIST OF USERS</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-20"
            onClick={() => {
              navigate("/newuser");
              setEditing(false);
            }}
          >
            ADD USER
          </button>
        </div>
        {/* title box end */}

        {/* users table box start  */}
        <table className="table-auto ml-80 mt-20">
          <tbody>
            {!Array.isArray(usersArray) ? (
              []
            ) : usersArray.length === 0 ? (
              <h1 className="text-3xl font-bold">No Users are available</h1>
            ) : (
              usersArray.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2 min-w-md cursor-pointer">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 min-w-md text-lg font-bold cursor-pointer">
                      {user.name}
                    </td>
                    <td className="border px-4 py-2 min-w-md">
                      <button
                        onClick={() => handleEdit(user, index)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2 w-20">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {/* users table box end  */}
      </div>
    </div>
  );
};

export default HomePage;
