// File: src/index.ts
import process from "process";
import TodoService from "./TodoService";

// Get command line arguments
const [program, script, subcommand, ...args] = process.argv;

const todoService = new TodoService();

switch (subcommand) {
  case "add": {
    const [title, description] = args;
    todoService.addTodo(title, description);
  }
  case "list": {
    todoService.listTodos();
    break;
  }
  case "done": {
    const [id] = args;
    todoService.markTodoAsDone(id);
    break;
  }
  case "undone": {
    const [id] = args;
    todoService.markTodoAsUndone(id);
    break;
  }
  case "delete": {
    const [id] = args;
    todoService.deleteTodo(id);
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
