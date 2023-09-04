import ccxt, { Dictionary, bitmart, Currency } from "ccxt";
type BitmartProps = Currency & {
  name: string;
};

const exchange = new bitmart();

export async function getOptions() {
  await exchange.loadMarkets();
  const currencies: Dictionary<BitmartProps> =
    exchange.currencies as Dictionary<BitmartProps>;

  const currenciesValueLabelPairs = Object.entries(currencies).map(
    (currency) => ({
      value: currency[1].id,
      label: currency[1].name,
    })
  );

  return currenciesValueLabelPairs;
}

export async function getUSDTPricesPerDataRange(
  startDate: string,
  endDate: string,
  currency: string
) {
  const since = exchange.parse8601(startDate);
  const toDate = exchange.parse8601(endDate);
  const startYear = Number(startDate.split("-")[0]);
  const endYear = Number(endDate.split("-")[0]);
  const coinUsdtPair = currency + "/USDT";
  let timeframe = "";

  if (endYear - startYear >= 1) {
    timeframe = "1w";
  } else timeframe = "1d";

  const data = await exchange.fetchOHLCV(coinUsdtPair, timeframe, since);

  const pricesPerdataRange = data.filter((values) => values[0] < toDate + 1);

  const pricesArr: number[] = [];
  const dateArr: string[] = [];

  const pricesPerDataRangeWithDates = pricesPerdataRange.map((date) => ({
    date: exchange.iso8601(date[0]).split("T")[0],
    price: (date[1] + date[2] + date[3] + date[4]) / 4,
  }));

  pricesPerDataRangeWithDates.forEach((value) => {
    pricesArr.push(value.price);
    dateArr.push(value.date);
  });

  console.log(pricesPerDataRangeWithDates);
  /* pricesPerdataRange.forEach((date) => console.log(exchange.iso8601(date[0]))); */
  return {
    prices: pricesArr,
    dates: dateArr,
  };
}
