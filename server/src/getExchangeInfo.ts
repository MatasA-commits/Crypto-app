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

export async function getPricesPerDataRange(
  startDate: string,
  endDate: string
) {
  const since = exchange.parse8601(startDate);
  const toDate = exchange.parse8601(endDate);

  const data = await exchange.fetchOHLCV("BTC/USDT", "1d", since);

  const pricesPerdataRange = data.filter((values) => values[0] <= toDate);

  return pricesPerdataRange;
}

const startDate = "2023-05-01T00:00:00.000Z";
const endDate = "2023-09-02T00:00:00.000Z";

getPricesPerDataRange(startDate, endDate);
