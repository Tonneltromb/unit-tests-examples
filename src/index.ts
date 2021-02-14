import start from "./server";

start()
  .then(() => console.log("server started"))
  .catch((error) => console.log("start server error", error));

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
  process.exit(1);
});
