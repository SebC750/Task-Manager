'use client'
import React, { useState } from 'react';
import NewTask from './NewTask';
import WarningModal from './WarningModal';
import { useRouter } from 'next/navigation';

const TaskList = ({ tasks }) => {
  const router = useRouter();
  const [editingTask, setEditingTask] = useState(null);

  const handleDeleteTask = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API}/api/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    document.getElementById("warningModal_" + id).close();
    router.refresh();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    document.getElementById("newTask").showModal();
  };

  return (
    <>
      <h3 className="text-accent text-4xl font-bold"> Tasks </h3>
      <div className="overflow-scroll lg:overflow-visible">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Priority</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.length > 0 ? tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td className="flex gap-2">
                  <button
                    className="btn bg-yellow-600 flex items-center border-0"
                    onClick={() => handleEditTask(task)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                    Edit
                  </button>
                  <button
                    className="btn bg-red-700 flex items-center border-0"
                    onClick={() => document.getElementById("warningModal_" + task.id).showModal()}
                  >
                    <i className="bi bi-eraser-fill font-bold"></i>
                    Delete
                  </button>
                  <WarningModal handleDeleteTask={handleDeleteTask} id={task.id} />
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5}>Nothing to show.</td></tr>
            )}
          </tbody>
        </table>
      </div>


      <NewTask editingTask={editingTask} clearEditingTask={() => setEditingTask(null)} />
    </>
  );
};

export default TaskList;
