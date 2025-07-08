import React from "react";
import TaskColumn from "./ColumnTask";

const TaskBoard = ({
  groupedTasks,
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
    <div className="board-container">
      {["Todo", "In Progress", "Done"].map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={groupedTasks[status]}
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
      ))}
    </div>
  );
};

export default TaskBoard;
