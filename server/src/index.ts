import { getOptions, getUSDTPricesPerDataRange } from "./getExchangeInfo";
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

app.post("/", async (req: any, res: any) => {
  let data = req.body;
  try {
    if (
      data.startDate !== undefined &&
      data.endDate !== undefined &&
      data.currency !== undefined
    ) {
      try {
        const postData = await getUSDTPricesPerDataRange(
          data.startDate,
          data.endDate,
          data.currency
        );
        res.send(JSON.stringify(postData));
      } catch (error) {
        console.log(error);
      }
    } else res.send(undefined);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
