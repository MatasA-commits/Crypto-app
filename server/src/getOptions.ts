import ccxt, { Dictionary, bitmart, Currency } from "ccxt";

type BitmartProps = Currency & {
  name: string;
};

export default async function getOptions() {
  const exchange = new bitmart();
  await exchange.loadMarkets(false);
  const currencies: Dictionary<BitmartProps> =
    exchange.currencies as Dictionary<BitmartProps>;

  const allCurrenciesValueLabelPairs = Object.entries(currencies).map(
    (currency) => {
      return {
        value: currency[1].id,
        label: currency[1].name,
      };
    }
  );

  return allCurrenciesValueLabelPairs;
}
