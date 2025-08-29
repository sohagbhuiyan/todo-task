import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";


export default function TodoPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="">
      {showForm ? (
        <TaskForm onClose={() => setShowForm(false)} />
      ) : (
        <TaskList onOpenForm={() => setShowForm(true)} />
      )}
    </div>
  );
}
