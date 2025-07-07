
 import React, { useEffect, useState } from "react";
 import axios from "axios"; 
 
 function Dashboard() {
  
   const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const groupedTasks = {
    Todo: [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task) => {
    groupedTasks[task.status]?.push(task);
  });

  return (
    <div>
      <h1>Welcome to Dashboard</h1>

      <div style={styles.boardContainer}>
        {["Todo", "In Progress", "Done"].map((status) => (
          <div key={status} style={styles.column}>
            <h2 style={styles.columnTitle}>{status}</h2>
            {groupedTasks[status].map((task) => (
              <div key={task._id} style={styles.taskCard}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small>Priority: {task.priority}</small>
                {task.assignedUser && (
                  <div>
                    <small>Assigned to: {task.assignedUser.name}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  boardContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "20px",
  },
  column: {
    flex: "1",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    height: "80vh",
    overflowY: "auto",
  },
  columnTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
};

export default  Dashboard;

