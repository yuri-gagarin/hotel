import readline from "readline";
import chalk from "chalk";
import mongoose from "mongoose";
//
import { generateMockContactPosts } from "./generateMockContactPosts";
import { generateMockDiningEntOptions } from "./generateMockDiningEntOptions";

import appConfig from "../../config/appConfig";

const { dbSettings } = appConfig;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: dbSettings.useFindAndModify,
  user: dbSettings.username,
  pass: dbSettings.password
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const models = 
  `Models:
   1 - Rooms
   2 - Services
   3 - Dining and Entertainment
   4 - Messages
   5 - Contact Posts
   0 - Exit`;

console.log(chalk.bgBlack.white.bold("Seed mock model data: \n"));
console.log(chalk.bgBlue.white.bold(models));

class SeedModels {
  constructor() {
    this.initialize();
    this.recursiveAsyncReadLine = this.recursiveAsyncReadLine.bind(this)
  }

  initialize() {
    mongoose.connect(dbSettings.mongoURI, mongoOptions, (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        this.recursiveAsyncReadLine()
      }
    })
  }

  async recursiveAsyncReadLine() {
    const self = this;
    rl.question('Command: ', async function (answer) {
      const res = await self.processCLInput(answer);
      if (!res) {
        self.recursiveAsyncReadLine(); //Calling this function again to ask new question
      } else {
        self.recursiveAsyncReadLine();
      }
    });
  };

  async processCLInput(string) {
    switch (string) {
      case "1": {
        console.log(chalk.bgRed.bold.white("Not supported yet"));
        return false;
      }
      case "2": {
        console.log(chalk.bgRed.bold.white("Not supported yet"));
        return false;
      }
      case "3": {
        return new Promise((resolve, reject) => {
          rl.question("How many 'Dining Entertainment' mock options to create?: ", (value) => {
            return generateMockDiningEntOptions(parseInt(value, 10))
              .then((result) => {
                console.log(result.length);
                resolve(result);
              })
              .catch((error) => {
                console.log(error)
                reject(error);
              });
          });
        });
      }
      case "4": {
        console.log(chalk.bgRed.bold.white("Not supported yet"));
        return false;
      }
      case "5": {
        return new Promise((res, rej) => {
          rl.question("How many 'Contact Post models to create?: ", (value) => {
            return res(generateMockContactPosts(parseInt(value, 10)));
          });
        });
      }
      case "0": {
        console.log(chalk.bgBlue.bold.white("Exiting"));
        process.exit(0);
        break;
      }
    }
  }
}

new SeedModels();