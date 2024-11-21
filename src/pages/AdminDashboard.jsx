import React, { useEffect, useState } from "react";
import TaskDialog from "../components/TaskDialog.jsx";
import AddUserForm from "../components/AddUserForm.jsx";
import UpdateUserForm from "../components/UpdateUserForm.jsx";
import ShowTask from "../components/ShowTask.jsx";
import { LuLogOut } from "react-icons/lu";
import UserCard from "../components/UserCard.jsx";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useGetAllUsers } from "../hooks/useGetAllUsers.jsx";
import { useUsersContext } from "../hooks/useUsersContext.jsx";
import { useLogout } from "../hooks/useLogout.jsx";
import { useSignUp } from "../hooks/useSignup.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.jsx";
import toast from "react-hot-toast";
const AdminDashboard = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshAllUsers, setRefreshAllUsers] = useState(false);
  const [showTasksForUser, setShowTasksForUser] = useState(null); // State for showing tasks
  const {getAllUsers} = useGetAllUsers();
  const {logout} = useLogout();
  const { signup } = useSignUp()
  useEffect(() => {
    const getAllUsersFn = async () => {
      await getAllUsers();
    };
    getAllUsersFn();
  }, [refreshAllUsers]);

  const {allusers} = useUsersContext();
  const users = allusers;
  const {user} = useAuthContext();
  const loggedInUser = user;
  // const loggedInUser = {
  //   id: 1,
  //   name: "Chacha Choudhary",
  //   username: "chacha_champion",
  //   email: "chacha@example.com",
  //   city: "Chachi Ka Dil",
  //   role: "Admin",
  // };
  const handleUpdateUserClick = (user) => {
    setSelectedUser(user);
    setShowUpdateUserForm(true);
  };

  const handleShowTasksClick = (user) => {
    setShowTasksForUser(user);
  };

  const handleLogout = () => {
    logout();
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASE_URL}/admin/delete/${id}`,{
        headers: {Authorization: `Bearer ${token}`}
      });
      if(response.status == 200){
        toast.success(response.data.message);
        setRefreshAllUsers(prev => !prev);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }    
  }

  return (
    <div className="p-2 pt-5 md:p-8 mb-10 bg-gray-900 text-gray-300 min-h-screen">
      <header className="bg-gradient-to-b from-blue-900 to-blue-950 hover:bg-gradient-to-t p-2 md:p-6 rounded-lg shadow-md mb-6 gap-5 md:gap-0 flex items-center justify-between">
        <div>
          <h1 className=" md:text-4xl font-bold text-blue-200">
            Admin Dashboard
          </h1>
          <p className=" text-sm md:text-lg text-blue-300">
            Manage users and tasks efficiently
          </p>
        </div>
        <div className="  ">
          <img
            className=" h-10 w-20 md:h-40 md:w-auto transition-all duration-500 hover:rotate-[360deg] hover:scale-110"
            src="https://imgs.search.brave.com/hGqcVhfGR2rNPkQMZkTsYaeXZRnK1RY6trw_FB3T1ZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWluaW9yYW5nZS5j/b20vaW1hZ2VzL2hl/YWRlci9wYW0ud2Vi/cA"
            alt="User-management-system-logo"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div>
              <p className=" font-bold md:text-3xl">{loggedInUser.name}</p>
              <p className=" text-xs md:text-md text-gray-300">
                @{loggedInUser.username}
              </p>
              <p className=" text-xs md:text-md text-gray-300">
                {loggedInUser.email}
              </p>
              <p className=" text-xs md:text-md text-gray-300">
                {loggedInUser.city}
              </p>
              <p className=" text-xs md:text-md text-gray-300">
                {loggedInUser.role}
              </p>
            </div>
            <div className="w-fit md:px-4 min-w-10 h-10 md:min-w-16 md:h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-sm md:text-2xl">
              {loggedInUser.name.split(" ").map((item) => item.charAt(0))}
            </div>
          </div>
        </div>
      </header>
      <div className="flex justify-between items-center mb-6">
        <button
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowAddUserForm(true)}
        >
          Add New User
        </button>
        <button
          onClick={handleLogout}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
        >
          <LuLogOut className="h-5 w-5 inline-block" />
          <span className={`ml-2 `}>Logout</span>
        </button>
      </div>
      <div className="w-full overflow-hidden flex flex-wrap justify-between gap-y-5">
        {users.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            deleteUser= {deleteUser}
            handleUpdateUserClick={handleUpdateUserClick}
            handleShowTasksClick={handleShowTasksClick}
            setShowTaskDialog={setShowTaskDialog}
          />
        ))}
      </div>

      {showTaskDialog && (
        <TaskDialog onClose={() => setShowTaskDialog(false)} />
      )}

      {showAddUserForm && (
        <AddUserForm
          onClose={() => setShowAddUserForm(false)}
          signup={signup}
          setRefreshAllUsers={setRefreshAllUsers}
        />
      )}

      {showUpdateUserForm && selectedUser && (
        <UpdateUserForm
          user={selectedUser}
          onClose={() => setShowUpdateUserForm(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
