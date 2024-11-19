import React, { useState } from "react";
import TaskDialog from "./TaskDialog";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";
import ShowTask from "./ShowTask"; // Import the ShowTask component
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTasksForUser, setShowTasksForUser] = useState(null); // State for showing tasks
  const navigate = useNavigate();
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "User",
      city: "New York",
      tasks: [
        {
          title: "Update user profile",
          status: "Completed",
          dueDate: "2024-08-20",
        },
        {
          title: "Review monthly report",
          status: "In process",
          dueDate: "2024-08-25",
        },
        {
          title: "Prepare presentation for team meeting",
          status: "Pending",
          dueDate: "2024-08-28",
        },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      role: "User",
      city: "Los Angeles",
      tasks: [
        {
          title: "Submit project documentation",
          status: "Completed",
          dueDate: "2024-08-15",
        },
        {
          title: "Plan next quarter's goals",
          status: "Pending",
          dueDate: "2024-09-01",
        },
      ],
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      role: "User",
      city: "Chicago",
      tasks: [
        {
          title: "Organize team-building event",
          status: "In process",
          dueDate: "2024-08-22",
        },
        {
          title: "Update software documentation",
          status: "Completed",
          dueDate: "2024-08-18",
        },
        {
          title: "Schedule one-on-one meetings",
          status: "Pending",
          dueDate: "2024-08-30",
        },
      ],
    },
    {
      id: 4,
      name: "David Brown",
      email: "david.brown@example.com",
      role: "User",
      city: "San Francisco",
      tasks: [
        // {
        //   title: "Complete performance review",
        //   status: "Pending",
        //   dueDate: "2024-09-05",
        // },
        // {
        //   title: "Update internal knowledge base",
        //   status: "Completed",
        //   dueDate: "2024-08-10",
        // },
        // {
        //   title: "Draft Q3 budget proposal",
        //   status: "In process",
        //   dueDate: "2024-08-25",
        // },
      ],
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      role: "User",
      city: "Miami",
      tasks: [
        {
          title: "Complete market research report",
          status: "In process",
          dueDate: "2024-08-26",
        },
        {
          title: "Review new software features",
          status: "Pending",
          dueDate: "2024-09-02",
        },
        {
          title: "Prepare quarterly sales presentation",
          status: "Completed",
          dueDate: "2024-08-18",
        },
      ],
    },
    {
      id: 6,
      name: "Frank Harris",
      email: "frank.harris@example.com",
      role: "User",
      city: "Dallas",
      tasks: [
        {
          title: "Update client contact list",
          status: "Completed",
          dueDate: "2024-08-14",
        },
        {
          title: "Review project timelines",
          status: "Pending",
          dueDate: "2024-09-03",
        },
        {
          title: "Conduct team training session",
          status: "In process",
          dueDate: "2024-08-27",
        },
      ],
    },
    {
      id: 7,
      name: "Grace Lee",
      email: "grace.lee@example.com",
      role: "User",
      city: "Seattle",
      tasks: [
        {
          title: "Prepare annual report",
          status: "In process",
          dueDate: "2024-09-10",
        },
        {
          title: "Organize customer feedback",
          status: "Completed",
          dueDate: "2024-08-16",
        },
        {
          title: "Update company website",
          status: "Pending",
          dueDate: "2024-08-30",
        },
      ],
    },
    {
      id: 8,
      name: "Henry Martinez",
      email: "henry.martinez@example.com",
      role: "User",
      city: "Denver",
      tasks: [
        {
          title: "Develop marketing strategy",
          status: "Pending",
          dueDate: "2024-09-07",
        },
        {
          title: "Review employee satisfaction survey",
          status: "Completed",
          dueDate: "2024-08-12",
        },
        {
          title: "Plan office relocation",
          status: "In process",
          dueDate: "2024-08-29",
        },
      ],
    },
    {
      id: 9,
      name: "Ivy Clark",
      email: "ivy.clark@example.com",
      role: "User",
      city: "Boston",
      tasks: [
        {
          title: "Update user training manual",
          status: "Completed",
          dueDate: "2024-08-05",
        },
        {
          title: "Prepare annual budget forecast",
          status: "In process",
          dueDate: "2024-08-23",
        },
        {
          title: "Coordinate with external vendors",
          status: "Pending",
          dueDate: "2024-09-08",
        },
      ],
    },
    {
      id: 10,
      name: "Jack Taylor",
      email: "jack.taylor@example.com",
      role: "User",
      city: "Philadelphia",
      tasks: [
        {
          title: "Implement new CRM system",
          status: "In process",
          dueDate: "2024-09-01",
        },
        {
          title: "Conduct market analysis",
          status: "Completed",
          dueDate: "2024-08-10",
        },
        {
          title: "Prepare project kickoff presentation",
          status: "Pending",
          dueDate: "2024-08-28",
        },
      ],
    },
  ];

  const loggedInUser = {
    id: 1,
    name: "Chacha Choudhary",
    username: "chacha_champion",
    email: "chacha@example.com",
    city: "Chachi Ka Dil",
    role: "Admin",
  };
  const handleUpdateUserClick = (user) => {
    setSelectedUser(user);
    setShowUpdateUserForm(true);
  };

  const handleShowTasksClick = (user) => {
    setShowTasksForUser(user);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="p-8 bg-gray-900 text-gray-300 min-h-screen">
      <header className="bg-gradient-to-b from-blue-900 to-blue-950 hover:bg-gradient-to-t p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-blue-200">
              Admin Dashboard
            </h1>
            <p className="text-lg text-blue-300">
              Manage users and tasks efficiently
            </p>
          </div>
          <div>
            <img
              className="h-40 transition-all duration-500 hover:rotate-[360deg] hover:scale-110"
              src="https://imgs.search.brave.com/hGqcVhfGR2rNPkQMZkTsYaeXZRnK1RY6trw_FB3T1ZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bWluaW9yYW5nZS5j/b20vaW1hZ2VzL2hl/YWRlci9wYW0ud2Vi/cA"
              alt="User-management-system-logo"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div>
                <p className=" font-bold text-3xl">{loggedInUser.name}</p>
                <p className=" text-md text-gray-300">
                  @{loggedInUser.username}
                </p>
                <p className=" text-md text-gray-300">{loggedInUser.email}</p>
                <p className=" text-md text-gray-300">{loggedInUser.city}</p>
                <p className=" text-md text-gray-300">{loggedInUser.role}</p>
              </div>
              <div className="w-fit px-4 min-w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white text-2xl">
                {loggedInUser.name.split(" ").map((item) => item.charAt(0))}
              </div>
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
          className="p-2 mr-5 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
        >
          <LuLogOut className="h-5 w-5 inline-block" />
          <span className={`ml-2 `}>Logout</span>
        </button>
      </div>
      <table className="w-full text-left bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-950 to-blue-800 hover:bg-gradient-to-l">
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Username</th>
            <th className="p-4 border-b">Email</th>
            <th className="p-4 border-b">City</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gradient-to-r from-gray-700 to-gray-800">
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr className=" transition-all duration-500 hover:skew-x-12 hover:bg-gradient-to-r from-gray-950 to-gray-700 ">
                <td className="p-4 border-b">{user.name}</td>
                <td className="p-4 border-b">
                  @{user.username || "mai nahi bataunga"}
                </td>
                <td className="p-4 border-b">{user.email}</td>
                <td className="p-4 border-b">{user.city}</td>
                <td className="p-4 border-b">
                  <button
                    className="py-1 px-3 mr-2 bg-yellow-700 rounded-lg hover:bg-yellow-800"
                    onClick={() => handleUpdateUserClick(user)}
                  >
                    Update
                  </button>
                  <button className="py-1 px-3 mr-2 bg-red-700 rounded-lg hover:bg-red-800">
                    Delete
                  </button>
                  <button
                    className="py-1 px-3 mr-2 bg-green-700 rounded-lg hover:bg-green-800"
                    onClick={() => setShowTaskDialog(true)}
                  >
                    Assign Task
                  </button>
                  <button
                    className="py-1 px-3 bg-purple-700 rounded-lg hover:bg-purple-800"
                    onClick={() => handleShowTasksClick(user)}
                  >
                    Show Tasks
                  </button>
                </td>
              </tr>
              {showTasksForUser && showTasksForUser.id === user.id && (
                <tr className="">
                  <td className="" colSpan="5">
                    <ShowTask
                      tasks={user.tasks}
                      onClose={() => setShowTasksForUser(null)}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {showTaskDialog && (
        <TaskDialog onClose={() => setShowTaskDialog(false)} />
      )}

      {showAddUserForm && (
        <AddUserForm onClose={() => setShowAddUserForm(false)} />
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
