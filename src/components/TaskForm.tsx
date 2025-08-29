import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/todoSlice";

export default function TaskForm({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    dispatch(addTask({ title, date, description }));
    onClose();
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Task Details</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Add a task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Add any description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
            Close
          </button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
