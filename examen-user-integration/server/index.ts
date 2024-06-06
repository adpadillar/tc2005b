import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { usersRouter } from "./src/routers/users";
import { feedbackRouter } from "./src/routers/feedback";
import { descriptionRouter } from "./src/routers/description";
import { chatRouter } from "./src/routers/chat";

const PORT = 3005;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/feedback", feedbackRouter);
app.use("/description", descriptionRouter);
app.use("/chat", chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
