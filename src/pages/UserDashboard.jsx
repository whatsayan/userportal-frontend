import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isLogoutButtonActive, setIsLogoutButtonActive] = useState(false);
  const loggedInUser = {
    id: 1,
    name: "Aman Kumar",
    username: "amazing_aman",
    email: "aman@example.com",
    city: "Delhi",
    role: "User",
  };
  console.log(loggedInUser.name.split(" "));
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish UI Design",
      description: "Complete the UI design for the new dashboard.",
      dueDate: "2023-06-30",
      status: "Pending",
    },
    {
      id: 2,
      title: "Implement API Endpoints",
      description:
        "Develop the backend API endpoints for the user management system.",
      dueDate: "2023-07-15",
      status: "In Process",
    },
    {
      id: 3,
      title: "Test User Flows",
      description:
        "Conduct user testing and identify any issues with the user flows.",
      dueDate: "2023-08-01",
      status: "Completed",
    },
    {
      id: 4,
      title: "Optimize Database Queries",
      description:
        "Review and optimize the database queries for improved performance.",
      dueDate: "2023-08-15",
      status: "Pending",
    },
    {
      id: 5,
      title: "Implement User Roles",
      description:
        "Develop the user roles and permissions system for the application. ",
      dueDate: "2023-09-01",
      status: "In Process",
    },
    {
      id: 6,
      title: "Refactor User Interface",
      description:
        "Refactor the user interface to improve the overall user experience.",
      dueDate: "2023-09-30",
      status: "Completed",
    },
  ]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className=" p-2 md:p-8 bg-gray-900 text-gray-300 min-h-screen">
      <header className="flex items-center justify-between bg-gray-800 hover:bg-[#1F2249] px-2 md:px-6 py-4 shadow rounded-xl relative">
        <div className="flex items-center gap-4">
          <div className="">
            <img
              className=" h-20 md:h-32 transition-all rounded-full duration-500 hover:rotate-[360deg] hover:scale-110"
              src="https://imgs.search.brave.com/oB7Ak67etRi_Ly1NApIiKr4VjhVC2ZehmrdxW0JsKo0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MTE2NDU0OC92ZWN0/b3IvYXZhdGFyLTUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUNLNDlTaExKd0R4/RTRraXJvQ1I0Mmtp/bVR1dWh2dW8yRkg1/eV82YVNnRW89"
              alt="User-management-system-logo"
            />
          </div>

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
        </div>

        <div className="flex flex-col gap-2">
          <div className=" w-full flex justify-end">
            <div className="w-fit p-3 md:px-4 md:min-w-16 md:h-16 bg-gray-700 rounded-full flex items-center justify-center text-white text-md font-bold md:text-2xl">
              {loggedInUser.name.split(" ").map((item) => item.charAt(0))}
            </div>
          </div>
          <div className=" md:h-16 flex justify-end">
            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsLogoutButtonActive(true)}
              onMouseLeave={() => setIsLogoutButtonActive(false)}
              className="p-2 h-full w-full md:w-auto md:min-w-16 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
            >
              <LuLogOut className="h-5 w-5 inline-block" />
              <span
                className={`ml-2 ${
                  isLogoutButtonActive ? "inline" : "hidden"
                } transition-all duration-300`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 grid gap-6">
        <section className="grid gap-4 mt-6">
          <div className="flex items-center bg-gray-800 hover:bg-[#1F2449] justify-center rounded-lg py-2">
            <h2 className="text-2xl font-semibold ">Tasks</h2>
          </div>
          <div className="grid sm:grid-cols-2 px-2 md:px-3 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all transform hover:scale-105 hover:shadow-xl hover:bg-[#1F2949] duration-300 hover:skew-x-2"
              >
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    {task.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{task.description}</p>
                  <p className="text-sm text-gray-400">
                    Due:{" "}
                    <time dateTime={task.dueDate}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </time>
                  </p>
                </div>
                <div className="mt-4">
                  <label className="font-semibold mr-2">Status:</label>
                  <div className="flex gap-1">
                    {["Pending", "In Process", "Completed"].map((status) => (
                      <label key={status} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.status === status}
                          onChange={() => handleStatusChange(task.id, status)}
                          className="form-checkbox text-blue-500"
                        />
                        <span className=""> {status} | </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
