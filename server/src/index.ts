import { getOptions, getUSDTPricesPerDataRange } from "./getExchangeInfo";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 3600;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "https://crypto-app-ten-pi.vercel.app",
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://crypto-app-ten-pi.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/optionList", async (req: any, res: any) => {
  const answer = await getOptions();
  res.json(answer);
});

app.post("/getGraphData", async (req: any, res: any) => {
  let data = req.body;
  try {
    if (
      data.startDate !== undefined &&
      data.endDate !== undefined &&
      data.currency !== undefined
    ) {
      const postData = await getUSDTPricesPerDataRange(
        data.startDate,
        data.endDate,
        data.currency
      );
      console.log(
        "Searched for:",
        data.lastInput,
        "\nSelected value:",
        data.currency,
        "\n"
      );
      res.send(JSON.stringify(postData));
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/getSearchData", (req: any, res: any) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

export default app;
