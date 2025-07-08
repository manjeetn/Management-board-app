import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ status, tasks, ...props }) => {
  return (
    <div className="column">
      <h2 className="column-title">{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} {...props} />
      ))}
    </div>
  );
};

export default TaskColumn;
