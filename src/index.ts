// File: src/index.ts
import process from "process";
import fs from "fs";

// Define what a todo looks like
interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

// process.argv is provided by Node.js and it is an array that contains the command line arguments
// The first element is the path to the Node.js executable
// The second element is the path to the script file
// The third element is the subcommand
// The rest of the elements are the arguments
// Get command line arguments
const [program, script, subcommand, ...args] = process.argv;

// If the todo list file does not exist, create it
if (!fs.existsSync("todos.json")) {
  fs.writeFileSync("todos.json", "[]");
}

switch (subcommand) {
  case "add": {
    const [title, description] = args;

    // Read todo list file and parse it
    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

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

    // Write the updated list back to the file
    const updatedFileContent = JSON.stringify(todoList, null, 2);
    fs.writeFileSync("todos.json", updatedFileContent);

    console.log("New todo added");
    break;
  }
  case "list": {
    // Read todo list file and parse it
    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

    // Print the list of todos
    for (const todo of todoList) {
      const status = todo.completed ? "X" : " ";
      console.log(`- [${status}] (id: ${todo.id}) ${todo.title}`);
      if (todo.description) console.log(`\t${todo.description}`);
    }

    break;
  }
  case "done": {
    const [id] = args;

    // Read todo list file and parse it
    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

    // Find the todo with the given id
    const todo = todoList.find((todo) => todo.id === args[0]);
    if (!todo) {
      console.log("Todo not found");
      process.exit(1);
    }

    // Mark the todo as completed
    todo.completed = true;

    // Write the updated list back to the file
    const updatedFileContent = JSON.stringify(todoList, null, 2);
    fs.writeFileSync("todos.json", updatedFileContent);

    // Print the message
    console.log("Todo marked as done");

    break;
  }
  case "undone": {
    const [id] = args;

    // Read todo list file and parse it
    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

    // Find the todo with the given id
    const todo = todoList.find((todo) => todo.id === args[0]);
    if (!todo) {
      console.log("Todo not found");
      process.exit(1);
    }

    // Mark the todo as not completed
    todo.completed = false;

    // Write the updated list back to the file
    const updatedFileContent = JSON.stringify(todoList, null, 2);
    fs.writeFileSync("todos.json", updatedFileContent);

    // Print the message
    console.log("Todo marked as undone");

    break;
  }
  case "delete": {
    const [id] = args;

    // Read todo list file and parse it
    const fileConent = fs.readFileSync("todos.json", "utf-8");
    const todoList = JSON.parse(fileConent) as Todo[];

    // Delete the todo with the given id
    const index = todoList.findIndex((todo) => todo.id === args[0]);
    if (index === -1) {
      console.log("Todo not found");
      process.exit(1);
    }
    todoList.splice(index, 1);

    // Write the updated list back to the file
    const updatedFileContent = JSON.stringify(todoList, null, 2);
    fs.writeFileSync("todos.json", updatedFileContent);

    // Print the message
    console.log("Todo deleted");

    break;
  }
  default:
    // Print help messages
    console.log(`Unknown subcommand`);
    console.log(`Usage: tdr <subcommand> [args]`);
    console.log(`Subcommands: add, list, done, undone, delete`);

    // Exit with an error code
    process.exit(1);
}
