import { getOptions, getPricesPerDataRange } from "./getOptions";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 3600;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/optionList", async (req: any, res: any) => {
  const answer = await getOptions();
  res.json(answer);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
