import React from "react";
import { FaCheck } from "react-icons/fa";
import { GiCrossedBones } from "react-icons/gi";
import { MdHourglassEmpty, MdOutlinePendingActions } from "react-icons/md";

const ShowTask = ({ tasks, onClose }) => {
    if(tasks.length === 0){
        return (
          <div className=" text-gray-200 text-xl h-16 border-b border-gray-200 bg-gradient-to-r from-blue-950 to-blue-800 hover:bg-gradient-to-l flex items-center justify-between px-3 py-3">
            <p>No tasks assigned.</p>
            <button
              className=" w-fit px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={onClose}
            >
              <GiCrossedBones />
            </button>
          </div>
        );
    }

  return (
    <div className="bg-gray-700 p-4 rounded-lg mt-2 shadow-lg">
      <div className=" bg-gradient-to-r from-blue-950 to-blue-800 hover:bg-gradient-to-l flex items-center justify-between px-3 py-3 rounded-lg mb-2 bg-gray-600">
        <span className=" text-gray-200 ">Assigned Tasks</span>
        <button
          className=" w-fit px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={onClose}
        >
          <GiCrossedBones />
        </button>
      </div>
      <table className="w-full text-left bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:bg-gradient-to-l">
            <th className="p-4 border-b">Task Title</th>
            <th className="p-4 border-b">Status</th>
            <th className="p-4 border-b">Due Date</th>
          </tr>
        </thead>
        <tbody className="bg-gradient-to-r from-gray-800 to-gray-600">
          {tasks.map((task, index) => (
            <tr
              className=" hover:bg-gradient-to-l from-gray-800 to-gray-600"
              key={index}
            >
              <td className="p-4 border-b">{task.title}</td>
              <td className="p-4 border-b flex items-center gap-2">
                {task.status}{" "}
                {task.status === "Completed" ? (
                  <FaCheck size={25} color="green" />
                ) : task.status === "Pending" ? (
                  <MdOutlinePendingActions size={25} color="orange" />
                ) : (
                  <MdHourglassEmpty size={25} color="#007bff" />
                )}{" "}
              </td>
              <td className="p-4 border-b">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowTask;
