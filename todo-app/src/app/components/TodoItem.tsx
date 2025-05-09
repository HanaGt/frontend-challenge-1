import React from 'react';
import { useSetRecoilState } from 'recoil';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { todoListState } from '../../recoil/atoms';

interface TodoItemProps {
  todo: { id: number; text: string };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const setTodoList = useSetRecoilState(todoListState);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const [isSelected, setIsSelected] = React.useState(false);

  const handleDelete = () => {
    setTodoList((oldList) => oldList.filter((item) => item.id !== todo.id));
  };

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      setTodoList((oldList) =>
        oldList.map((item) =>
          item.id === todo.id ? { ...item, text: editText } : item
        )
      );
    }
    setIsEditing(!isEditing);
  };

  const handleDoubleClick = () => {
  setIsEditing(true);
};

return (
  <li
    className={`flex items-center justify-between py-2 border-b border-gray-200 transition-all duration-300 ease-in-out ${
      isSelected ? 'bg-purple-50' : ''
    }`}
    onDoubleClick={handleDoubleClick} // Enable double-click to edit
  >
    <div className="flex items-center gap-2">
      <input
        type="radio"
        name="todo-item"
        className="h-5 w-5 rounded-full border-2 border-purple-500 text-purple-500 focus:ring-0 cursor-pointer"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit} // Save changes on blur
          className="text-lg text-gray-800 border-b border-purple-500 focus:outline-none"
        />
      ) : (
        <span className="text-lg text-gray-800">{todo.text}</span>
      )}
    </div>
    <div className="flex gap-2">
      <button onClick={handleEdit} className="text-purple-500 hover:text-purple-700">
        <HiPencil className="h-5 w-5" />
      </button>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
        <HiTrash className="h-5 w-5" />
      </button>
    </div>
  </li>
);
};

export default TodoItem;