const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");

const Data = require("./model/DataModel");
const data = require("./data/data");
const connectDb = require("./config/config");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await Data.deleteMany();

    const sampleData = data.map((d1) => {
      return {
        ...d1,
        // , user: adminUser
      };
    });
    await Data.insertMany(sampleData);
    console.log("Data Imported!!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const dataDestory = async () => {
  try {
    // await Order.deleteMany();
    await Data.deleteMany();
    // await User.deleteMany();
    console.log("Data Destory".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  dataDestory();
} else {
  importData();
}
