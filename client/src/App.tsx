import React, { useState } from 'react';
import './styles/App.scss';
import ccxt from 'ccxt';
import Select from "react-select";

export default function App() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();
  const [error, setError] = useState(false)

  // Array of all options
  const optionList = [
    { value: "Test", label: "Test" },
    { value: "Test1", label: "Test1" },
    { value: "Test2", label: "Test2" },
  ];

  const exchange = new ccxt.binance ()
  exchange.setSandboxMode (true)
  console.log(exchange)

  function handleInput(input: string) {
    if (input.length >= 30) {
      setError(true)
    }
    else setError(false)
  }

  function handleSelect(data: any) {
    setSelectedOptions(data);
  }

  return (
    <div className="app">
      <div className='input-error'>
        {error === true ? 'Input is too long' : ''}
      </div>
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Search cryptocurrency"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti={false}
          onInputChange={handleInput}
        />
      </div>
    </div>
  );
}