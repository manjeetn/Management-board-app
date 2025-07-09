import React, { useState } from "react";

const TaskForm = ({ newTask, setNewTask, users, handleCreateTask }) => {
  const [expanded, setExpanded] = useState(false);


  const resetForm = () => {
    setNewTask({
      title: "",
      description: "",
      status: "Todo",
      priority: "Low",
      assignedUser: ""
    });
  };

 
  const handleExpand = () => {
    setExpanded(true);
  };


  const handleCancel = () => {
    resetForm();
    setExpanded(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateTask(e);  
      resetForm();                
      setExpanded(false);         
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="create-task-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onClick={handleExpand}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          style={{
               backgroundColor: "#f0f0f0",
              padding: "5px",
              borderRadius: "8px",
              marginBottom: "10px",
              width: "100%",
              height: "35px",          
          }}
        />

        <textarea
          placeholder="Description"
          value={newTask.description}
          onClick={handleExpand}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
          style={{
            backgroundColor: "#f0f0f0",
              borderRadius: "8px",
               marginBottom: "10px",
               width: "100%",
              height: "50px",  
               padding: "8px", 
          }}
        />
       
        {expanded && (
          <>
            <label>Status:</label>
            <select
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
              required
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <label>Priority:</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label>Assign To:</label>
            <select
              value={newTask.assignedUser}
              onChange={(e) => setNewTask({ ...newTask, assignedUser: e.target.value })}
              required
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
            </select>

           
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button type="submit">Add</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
