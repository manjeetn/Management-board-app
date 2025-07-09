import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./dashboard/TaskForm";
import TaskBoard from "./dashboard/TaskBoard";
import "../App.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Todo",
    priority: "Low",
    assignedUser: ""
  });

  useEffect(() => {
    axios.get("http://localhost:3001/api/tasks")
      .then((res) => setTasks(res.data))
      .catch(console.error);

    axios.get("http://localhost:3001/api/auth/users")
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  const groupedTasks = { Todo: [], "In Progress": [], Done: [] };
  tasks.forEach(task => groupedTasks[task.status]?.push(task));

  const handleDelete = async (taskId) => {
    await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
    setTasks(prev => prev.filter(task => task._id !== taskId));
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({ title: task.title, description: task.description });
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTask({ title: "", description: "" });
  };

  const handleSave = async (taskId) => {
    const res = await axios.patch(`http://localhost:3001/api/tasks/${taskId}`, editedTask);
    setTasks(prev => prev.map(task => task._id === taskId ? res.data : task));
    setEditingTaskId(null);
    setEditedTask({ title: "", description: "" });
  };

  const handleAssign = async (taskId, userId) => {
    const res = await axios.patch(`http://localhost:3001/api/tasks/${taskId}`, { assignedUser: userId || null });
    setTasks(prev => prev.map(task => task._id === taskId ? res.data : task));
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3001/api/tasks", newTask);
    setTasks(prev => [...prev, res.data]);
    setNewTask({ title: "", description: "", status: "Todo", priority: "Low", assignedUser: "" });
  };

  return (
    <div>
      <h1 className="dashboard-heading">Kanban Dashboard</h1>
      <TaskForm newTask={newTask} setNewTask={setNewTask} users={users} handleCreateTask={handleCreateTask} />
      <TaskBoard
        groupedTasks={groupedTasks}
        users={users}
        editingTaskId={editingTaskId}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleAssign={handleAssign}
      />
    </div>
  );
}

export default Dashboard;
