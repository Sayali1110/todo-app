export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Props {
  tasks: Task[];
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editText: string | null;
  setEditText: (id: string | null) => void;
  editInput: string;
  setEditInput: (value: string) => void;
  updateTask: ({ id, text }: { id: string; text: string }) => void;
}
