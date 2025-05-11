# 📝 Todo App

A modern, feature-rich TODO application built with **React**, **RecoilJS**, **Tailwind CSS**, and **TypeScript**. This app is designed to be **responsive**, **accessible**, and **user-friendly**, with a focus on clean code and reusable components.

## 🚀 Features

### ✅ Core Functionality

- **Add Todos**  
  Add tasks using a text input with a submit button or by pressing `Enter`.

- **Display Todo List**  
  View a list of tasks with clean styling and an empty state message when no tasks are available.

- **Edit Todo**  
  Double-click or use an edit icon to modify a task. Save or cancel edits.

- **Delete Todo**  
  Remove tasks using a delete button (with optional confirmation prompt).

- **Mark as Completed**  
  Use checkboxes or radio buttons to mark tasks as done. Completed tasks are styled with a strikethrough and faded color.

- **Filter Todos**  
  Filter tasks by `All`, `Active`, or `Completed` using tabs or a dropdown.

- **Search Todos**  
  Live search bar to filter tasks by text input.

- **Reorder Todos**  
  Drag-and-drop functionality using [`@dnd-kit/core`](https://github.com/clauderic/dnd-kit) or [`@hello-pangea/dnd`](https://github.com/hello-pangea/dnd).

- **Local Storage Support**  
  Automatically persists todos across sessions.

- **Responsive Design**  
  Optimized for mobile, tablet, and desktop.

## 🎨 Smooth UX

- **Animations**  
  Elegant transitions and motion effects via **Framer Motion**.

- **Undo Delete**  
  Easily restore recently deleted todos.

- **Loading States**  
  Skeleton loaders provide a better visual experience while loading.

## ♿ Accessible UI

- Keyboard navigable  
- Proper ARIA roles and labels  
- High contrast for improved readability

## 🧰 Tech Stack

- ⚛️ **React** – Component-based UI library  
- 🎯 **RecoilJS** – State management for React  
- 🎨 **Tailwind CSS** – Utility-first CSS framework  
- ⛑ **TypeScript** – Strongly typed JavaScript  
- 🎞 **Framer Motion** – For animations  
- 🧩 **@dnd-kit/core** – Drag-and-drop support  
- 💾 **Local Storage** – Data persistence

## ⚙️ Getting Started

### ✅ Prerequisites

- **Node.js** v18+
- **pnpm** (preferred package manager)

### 📥 Installation

```bash
git clone https://github.com/HanaGt/frontend-challenge-1.git
cd todo-app
pnpm install
