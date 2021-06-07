const mongoose = require("mongoose");

const connectDb = async () => {
  const con = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB is connected to host: ${con.connection.host}`.blue.bold);
};

module.exports = connectDb;
