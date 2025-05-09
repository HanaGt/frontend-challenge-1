import React from 'react';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        <Header />
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;