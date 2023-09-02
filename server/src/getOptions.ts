import ccxt, { Dictionary, bitmart, Currency } from "ccxt";

type BitmartProps = Currency & {
  name: string;
};

const exchange = new bitmart();

export async function getOptions() {
  await exchange.loadMarkets();
  const currencies: Dictionary<BitmartProps> =
    exchange.currencies as Dictionary<BitmartProps>;

  const allCurrenciesValueLabelPairs = Object.entries(currencies).map(
    (currency) => ({
      value: currency[1].id,
      label: currency[1].name,
    })
  );

  return allCurrenciesValueLabelPairs;
}

export async function getPricesPerDataRange() {
  const since = exchange.parse8601("2023-09-02T00:00:00.000Z");
  console.log(since);
  const data = await exchange.fetchOHLCV("BTC/USDT", "1h", since);
  console.log(data);
}

function getDatesInRange(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

const startDate = new Date("2022-09-02T00:00:00.000Z");
const endDate = new Date("2023-09-02T00:00:00.000Z");

console.log(getDatesInRange(startDate, endDate));
