import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2, CheckSquare, Square, Calendar, Save, X } from "lucide-react";
import type { RootState } from "../app/store";
import { deleteTask, toggleTask, editTask } from "../features/todoSlice";
import { useState } from "react";

export default function TaskList({ onOpenForm }: { onOpenForm: () => void }) {
  const tasks = useSelector((state: RootState) => state.todos.tasks);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", date: "" });

  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Start editing
  const handleEdit = (task: any) => {
    setEditId(task.id);
    setFormData({ title: task.title, description: task.description, date: task.date });
  };

  // Save update
  const handleSave = (id: string) => {
    dispatch(editTask({ id, ...formData }));
    setEditId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tasks</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={onOpenForm}
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center">No tasks available. Add one!</p>
      )}

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-300 rounded-lg shadow-lg bg-gray-50"
          >
            {/* Left: Checkbox + Task Info */}
            <div className="flex items-start space-x-3 w-full sm:w-auto">
              <button onClick={() => dispatch(toggleTask(task.id))} className="mt-1">
                {task.completed ? (
                  <CheckSquare className="text-green-600" />
                ) : (
                  <Square />
                )}
              </button>

              <div className="flex-1">
                {editId === task.id ? (
                  <div className="border rounded-lg p-2 bg-white space-y-2">
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border rounded p-1 text-sm"
                      placeholder="Task title"
                    />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full border rounded p-1 text-sm"
                      placeholder="Task description"
                    />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border rounded p-1 text-sm"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg p-2 bg-white">
                    <p
                      className={`font-medium ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Date + Actions */}
            <div className="flex justify-between sm:justify-end items-center mt-3 sm:mt-0 sm:ml-4 w-full sm:w-auto">
              <div className="flex items-center text-gray-600 text-sm space-x-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {editId === task.id ? (
                    <span className="italic text-gray-400">Editing…</span>
                  ) : (
                    formatDate(task.date)
                  )}
                </span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 ml-4">
                {editId === task.id ? (
                  <>
                    <button
                      className="p-1 border rounded text-green-600 hover:bg-green-100"
                      onClick={() => handleSave(task.id)}
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 border rounded text-gray-600 hover:bg-gray-100"
                      onClick={() => setEditId(null)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-1 border rounded hover:bg-gray-100"
                      onClick={() => handleEdit(task)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 border rounded text-red-600 hover:bg-red-100"
                      onClick={() => dispatch(deleteTask(task.id))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
