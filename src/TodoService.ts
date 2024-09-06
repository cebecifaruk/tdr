// File: src/TodoService.ts
import fs from "fs";

// Define what a todo looks like
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// Define the TodoService class
class TodoService {
  constructor() {}

  private readTodos(): Todo[] {
    if (!fs.existsSync("todos.json")) {
      fs.writeFileSync("todos.json", "[]");
    }

    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

    return todoList;
  }

  private writeTodos(todoList: Todo[]): void {
    const updatedFileContent = JSON.stringify(todoList, null, 2);
    fs.writeFileSync("todos.json", updatedFileContent);
  }

  public addTodo(title: string, description: string): void {
    const todoList = this.readTodos();

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

    this.writeTodos(todoList);

    console.log("New todo added");
  }

  public listTodos() {
    const todoList = this.readTodos();

    // Print the list of todos
    for (const todo of todoList) {
      const status = todo.completed ? "X" : " ";
      console.log(`- [${status}] (id: ${todo.id}) ${todo.title}`);
      if (todo.description) console.log(`\t${todo.description}`);
    }
  }

  public markTodoAsDone(id: string) {
    const todoList = this.readTodos();

    // Find the todo with the given id
    const todo = todoList.find((todo) => todo.id === id);
    if (!todo) {
      console.log("Todo not found");
      process.exit(1);
    }

    // Mark the todo as completed
    todo.completed = true;

    this.writeTodos(todoList);

    // Print the message
    console.log("Todo marked as done");
  }

  public markTodoAsUndone(id: string) {
    const todoList = this.readTodos();

    // Find the todo with the given id
    const todo = todoList.find((todo) => todo.id === id);
    if (!todo) {
      console.log("Todo not found");
      process.exit(1);
    }

    // Mark the todo as not completed
    todo.completed = false;

    this.writeTodos(todoList);

    // Print the message
    console.log("Todo marked as undone");
  }

  public deleteTodo(id: string) {
    const todoList = this.readTodos();

    // Delete the todo with the given id
    const index = todoList.findIndex((todo) => todo.id === id);
    if (index === -1) {
      console.log("Todo not found");
      process.exit(1);
    }
    todoList.splice(index, 1);

    this.writeTodos(todoList);

    // Print the message
    console.log("Todo deleted");
  }
}

export default TodoService;
