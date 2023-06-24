import express from "express";
import userRoutes from "./routes/users.js";

const PORT = 5000;
const app = express();
app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => res.send(user));

app.listen(5000, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});
