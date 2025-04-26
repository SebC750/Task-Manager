'use client'
import React, { useState } from 'react';
import NewTask from './NewTask';
import WarningModal from './WarningModal';
import { useRouter } from 'next/navigation';

const TaskList = ({ tasks }) => {
  const router = useRouter();
  const [editingTask, setEditingTask] = useState(null);

  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
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
                  className="btn bg-yellow-600" 
                  onClick={() => handleEditTask(task)}
                >
                  Edit
                </button>
                <button 
                  className="btn bg-red-700" 
                  onClick={() => document.getElementById("warningModal_" + task.id).showModal()}
                >
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

      <NewTask editingTask={editingTask} clearEditingTask={() => setEditingTask(null)} />
    </>
  );
};

export default TaskList;
