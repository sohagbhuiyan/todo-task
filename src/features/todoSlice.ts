import { createSlice, nanoid} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  completed?: boolean;
}

interface TodoState {
  tasks: Task[];
}

const loadState = (): Task[] => {
  try {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveState = (tasks: Task[]) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TodoState = {
  tasks: loadState(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.tasks.push(action.payload);
        saveState(state.tasks);
      },
      prepare(task: Omit<Task, "id" | "completed">) {
        return { payload: { ...task, id: nanoid(), completed: false } };
      },
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveState(state.tasks);
    },
    editTask(state, action: PayloadAction<Task>) {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx >= 0) state.tasks[idx] = action.payload;
      saveState(state.tasks);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveState(state.tasks);
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
