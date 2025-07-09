
import React, {useState} from "react";

const TaskForm = ({ newTask, setNewTask, users, handleCreateTask }) => {
  
  const [expanded, setExpanded] = useState(false); 

  const handleExpand = () => {
    setExpanded(true); 
  };

  const handleCancel = () => {
  setExpanded(false);  
  setNewTask((prev) => ({
    ...prev,
    status: "Todo",
    priority: "Low",
    assignedUser: ""
  }));
};


  return (
  
    <div className="create-task-container">
      <h2>Add Task</h2>
     <form onSubmit={handleCreateTask}>
  <input
    style={{ backgroundColor: "#f0f0f0", padding: "8px", borderRadius: "8px" }}
    type="text"
    placeholder="Title"
    value={newTask.title}
    onClick={handleExpand}
    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
    required
  />

  <textarea
    style={{ backgroundColor: "#f0f0f0", borderRadius: "5px" }}
    placeholder="Description"
    value={newTask.description}
    onClick={handleExpand}
    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
    required
  />

  {expanded && (
    <>
      <label>Status:</label>
      <select
        value={newTask.status}
        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <label>Priority:</label>
      <select
        value={newTask.priority}
        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label>Assign To:</label>
      <select
        value={newTask.assignedUser}
        onChange={(e) =>
          setNewTask({ ...newTask, assignedUser: e.target.value })
        }
      >
        <option value="">Unassigned</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.fullName}
          </option>
        ))}
      </select>
     <div style={{ display:"flex", gap:"10px", marginTop:"10px"}}>
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
