import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  Children, // Separate import
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // initial state of usersArray
  const [usersArray, setUsersArray] = useState([]);

  //editing
  const [editingIndex, setEditingIndex] = useState();
  const [editing, setEditing] = useState(false);

  //add new user to usersArray
  const addUser = async (e, user, setUser) => {
    try {
      await axios.post("http://localhost:5000/newuser", user);
      setUsersArray((prevUsers) => [...prevUsers, user]);
    } catch (error) {
      console.log(error);
    }
  };

  //delete user
  const deleteUser = async (index) => {
    try {
      const deletedUserId = usersArray[index]._id;
      await axios.delete(`http://localhost:5000/users/${deletedUserId}`);
      setUsersArray((prevUsers) => prevUsers.filter((_, i) => i !== index));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  //handle edit
  const editUser = async (index, user) => {
    const updatedUserId = usersArray[index]._id;
    await axios.put(`http://localhost:5000/users/${updatedUserId}`, user);
    setUsersArray((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = user;
      return updatedUsers;
    });
  };

  // get all users from api
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsersArray(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [usersArray]);
  return (
    <UserContext.Provider
      value={{
        deleteUser,
        addUser,
        usersArray,
        editUser,
        editingIndex,
        editing,
        setEditing,
        setEditingIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
