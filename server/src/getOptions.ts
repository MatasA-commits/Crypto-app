import ccxt from "ccxt";

export default function getOptions() {
  const exchange = new ccxt.binance();
  exchange.setSandboxMode(true);

  function toValueLabelPairs([value, label]: [string, string]) {
    return { value, label };
  }

  const currencies: [string, string] = exchange.commonCurrencies;
  console.log(currencies);

  const optionList = Object.entries(currencies).map(toValueLabelPairs);

  return optionList;
}
