require("dotenv").config();
const app = require("./app");
const dataBase = require("./core/db");
const PORT = process.env.PORT || 2000;

const start = async () => {
  try {
    await dataBase.authenticate();
    console.log("Database connection...");
    await dataBase.sync({
      underscore: true,
      // force: true,
    });
    app.listen(PORT, () => {
      console.log(`Server ${process.env.NODE_ENV} started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
