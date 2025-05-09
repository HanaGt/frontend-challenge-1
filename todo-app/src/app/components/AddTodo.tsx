import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../../recoil/atoms';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addTodo = () => {
    if (text.trim()) {
      setTodoList((oldList) => [
        ...oldList,
        { id: Date.now(), text, completed: false },
      ]);
      setText('');
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <div className="relative flex-1">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Memorize the dictionary"
          className="w-full pl-10 pr-4 py-2 text-gray-600 placeholder-gray-400 border-b border-gray-300 focus:outline-none focus:border-purple-500 transition-all duration-300"
        />
      </div>
      <button
        onClick={addTodo}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddTodo;