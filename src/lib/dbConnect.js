import mongoose from 'mongoose';


// Function to connect with database
async function dbConnect() {

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "farmEasy"
    });
    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Database connection failed: ", error);
    process.exit(1);
  }
}

export default dbConnect;
