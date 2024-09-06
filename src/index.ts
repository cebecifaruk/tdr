// File: src/index.ts
import process from "process";
import * as todo from "./todo";

// Get command line arguments
const [program, script, subcommand, ...args] = process.argv;

switch (subcommand) {
  case "add": {
    const [title, description] = args;
    todo.addTodo(title, description);
  }
  case "list": {
    todo.listTodos();
    break;
  }
  case "done": {
    const [id] = args;
    todo.markTodoAsDone(id);
    break;
  }
  case "undone": {
    const [id] = args;
    todo.markTodoAsUndone(id);
    break;
  }
  case "delete": {
    const [id] = args;
    todo.deleteTodo(id);
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
