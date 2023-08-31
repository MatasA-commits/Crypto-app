import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import Select from "react-select";
import axios from 'axios';

const backendUrl = 'http://localhost:4000'

export default function App() {
  const [cryptioOptions, setCryptioOptions] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get(`${backendUrl}/optionList`).then((response) => {
      setCryptioOptions(response.data)
    });
  }, []);

  function handleInput(input: string) {
    if (input.length >= 30) {
      setError(true)
    }
    else setError(false)
  }

  function handleSelect(data: any) {
    console.log(data)
    setSelectedOptions(data);
  }

  return (
    <div className="app">
      <div className='input-error'>
        {error === true ? 'Input is too long' : ''}
      </div>
      <div className="dropdown-container">
        <Select
          options={cryptioOptions}
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