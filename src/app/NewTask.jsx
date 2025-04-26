'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const NewTask = ({ editingTask = null, clearEditingTask = () => {} }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priority: 'Low'
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        name: editingTask.name,
        description: editingTask.description,
        priority: editingTask.priority
      });
    } else {
      setFormData({
        name: '',
        description: '',
        priority: 'Low'
      });
    }
  }, [editingTask]);

  const handleTaskSubmit = async () => {
    try {
      if (editingTask) {
        
        await fetch(`http://localhost:3000/api/tasks/${editingTask.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } else {
        
        await fetch("http://localhost:3000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      }
      refreshData();
      document.getElementById("newTask").close();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  const refreshData = () => setFormData({ name: '', description: '', priority: 'Low' });

  return (
    <dialog className="modal" id="newTask">
      <div className="modal-box">
        <div className="modal-action">
          <form method="dialog">
            <button 
              className="btn btn-accent btn-sm" 
              onClick={() => clearEditingTask()}
            >
              X
            </button>
          </form>
        </div>
        <h3 className="text-3xl text-accent font-bold border-0 border-b-2 border-accent">
          {editingTask ? "Edit Task" : "New Task"}
        </h3>
        <fieldset className="fieldset">
          <label className="fieldset-label"> Task name </label>
          <input 
            className="p-2 bg-slate-950 rounded-xl"
            value={formData.name}
            placeholder="Ex. My Task"
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
          <label className="fieldset-label"> Task description </label>
          <input 
            className="p-2 bg-slate-950 rounded-xl"
            value={formData.description}
            placeholder="Ex. Buy groceries"
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
          <label className="fieldset-label"> Priority </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className="select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </fieldset>
        <footer className="navbar justify-end">
          <button 
            className="btn btn-accent"
            onClick={handleTaskSubmit}
          >
            {editingTask ? "Update" : "Submit"}
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default NewTask;
