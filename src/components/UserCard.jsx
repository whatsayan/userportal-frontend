import React from "react";

const UserCard = ({
  user,
  handleUpdateUserClick,
  handleShowTasksClick,
  setShowTaskDialog,
  deleteUser
}) => {
  const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;
  return (
    <div className=" w-full md:w-[32%] bg-gray-800 p-2 md:p-6 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-400">
            @{user.username || "mai nahi bataunga"}
          </p>
        </div>
        <div>
          <span className="text-md tracking-tighter font-semibold">{user.city}</span>
          <p className="text-gray-400">
            {user.role || "mai nahi bataunga"}
          </p>
        </div>
        
      </div>
      <div className="mb-4">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" flex justify-between ">
          <button
            className="py-2 px-4 bg-yellow-700 rounded-lg hover:bg-yellow-800"
            onClick={() => handleUpdateUserClick(user)}
          >
            Update
          </button>
          <button
            className={`py-2 px-4 bg-red-700 rounded-lg hover:bg-red-800 ${
              user?.id == loggedInUserId ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={user?.id == loggedInUserId}
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
        <div className=" flex justify-between ">
          <button
            className="py-2 px-4 bg-green-700 rounded-lg hover:bg-green-800"
            onClick={() => setShowTaskDialog(true)}
          >
            Assign Task
          </button>
          <button
            className="py-2 px-4 bg-purple-700 rounded-lg hover:bg-purple-800"
            onClick={() => handleShowTasksClick(user)}
          >
            Show Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
