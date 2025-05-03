import { connect, disconnect } from "mongoose";

async function connectionToDatabase() {
  try {
    await connect(process.env.MONGODB_URL).then(() => {
      console.log("Connected successfully");
    });
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connected to db");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new error("Could not disconneted from database");
  }
}

export { connectionToDatabase, disconnectFromDatabase };
