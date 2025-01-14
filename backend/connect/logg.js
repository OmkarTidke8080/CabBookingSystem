import chalk from "chalk";

// Chalk for detailing the console (highlighting errors, etc.)
 const Logger = {
  error: (message) => {
    console.log(chalk.red(message));
  },
  warning: (message) => {
    console.log(chalk.yellow(message));
  },
  info: (message) => {
    console.log(chalk.blue(message));
  },
  success: (message) => {
    console.log(chalk.green(message));
  },
};

export default Logger