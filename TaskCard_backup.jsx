import React from "react";

const TaskCard = ({
  task,
  users,
  editingTaskId,
  editedTask,
  setEditedTask,
  handleEdit,
  handleDelete,
  handleCancel,
  handleSave,
  handleAssign
}) => {
  return (
    <div className="task-card">
      {editingTaskId === task._id ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <div>
            <button onClick={() => handleSave(task._id)}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="task-header">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <small>Priority: {task.priority}</small>
            </div>
            <div className="assign-dropdown">
              <label className="assigned-label">Assign to </label>
              <select
                value={task.assignedUser?._id || ""}
                onChange={(e) => handleAssign(task._id, e.target.value)}
              >
                <option value="">Unassigned</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>


         <div className="task-buttons">
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </div>

          {task.assignedUser && (
            <div className="assigned-to">
              <small>Assigned to: {task.assignedUser.fullName}</small>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskCard;
