const mongoose = require("mongoose");
require("colors");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      // process.env.MONGO_URI,
      // "mongodb://0.0.0.0:27017/Crud",
      // "mongodb://127.0.0.1:27017/Crud",
      // "mongodb://localhost:27017/Crud",
      "mongodb+srv://chovatiyashivani:GHY5ausg8BEYdD2n@cluster0.sjgygtp.mongodb.net/CrudOperation",
      // GHY5ausg8BEYdD2n
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //   useCreateIndex: true
      }
    );
    console.log(`Mongodb Connected ${conn.connection.host}`.yellow);
  } catch (error) {
    console.error(`Error : ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDb;
