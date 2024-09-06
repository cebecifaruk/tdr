// File: src/todo.ts
import fs from "fs";

// Define what a todo looks like
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Read todo list file and parse it
function readTodos(): Todo[] {
  if (!fs.existsSync("todos.json")) {
    fs.writeFileSync("todos.json", "[]");
  }

  const fileConent = fs.readFileSync("todos.json", "utf-8");
  const todoList = JSON.parse(fileConent) as Todo[];

  return todoList;
}

// Write the updated list back to the file
function writeTodos(todoList: Todo[]): void {
  const updatedFileContent = JSON.stringify(todoList, null, 2);
  fs.writeFileSync("todos.json", updatedFileContent);
}

export function addTodo(title: string, description: string): void {
  const todoList = readTodos();

  // Generate a new todo
  const id = Math.random().toString(36).substr(2, 5);
  const newTodo: Todo = {
    id: id,
    title,
    description,
    completed: false,
  };

  // Add the new todo to the list
  todoList.push(newTodo);

  writeTodos(todoList);

  console.log("New todo added");
}

export function listTodos() {
  const todoList = readTodos();

  // Print the list of todos
  for (const todo of todoList) {
    const status = todo.completed ? "X" : " ";
    console.log(`- [${status}] (id: ${todo.id}) ${todo.title}`);
    if (todo.description) console.log(`\t${todo.description}`);
  }
}

export function markTodoAsDone(id: string) {
  const todoList = readTodos();

  // Find the todo with the given id
  const todo = todoList.find((todo) => todo.id === id);
  if (!todo) {
    console.log("Todo not found");
    process.exit(1);
  }

  // Mark the todo as completed
  todo.completed = true;

  writeTodos(todoList);

  // Print the message
  console.log("Todo marked as done");
}

export function markTodoAsUndone(id: string) {
  const todoList = readTodos();

  // Find the todo with the given id
  const todo = todoList.find((todo) => todo.id === id);
  if (!todo) {
    console.log("Todo not found");
    process.exit(1);
  }

  // Mark the todo as not completed
  todo.completed = false;

  writeTodos(todoList);

  // Print the message
  console.log("Todo marked as undone");
}

export function deleteTodo(id: string) {
  const todoList = readTodos();

  // Delete the todo with the given id
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index === -1) {
    console.log("Todo not found");
    process.exit(1);
  }
  todoList.splice(index, 1);

  writeTodos(todoList);

  // Print the message
  console.log("Todo deleted");
}
