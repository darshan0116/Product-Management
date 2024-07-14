import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./app/config/dbConnect";
import { logger } from "./app/utils/loggerUtils";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./app/routes";

dotenv.config({ path: ".env" });
connectDb();

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use("/public", express.static("public"));

app.use("/", router);

app.listen(8000, () => {
  logger.info("server is running on 8000 port");
});
