import getOptions from "./getOptions";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const optionList = getOptions();

app.get("/optionList", (req: any, res: any) => {
  res.json(optionList);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
