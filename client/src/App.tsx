import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import Select from "react-select";
import axios from "axios";
import DatePickerComponent from "./components/DatePicker";

const backendUrl = "http://localhost:4000";

export default function App() {
  const [cryptioOptions, setCryptioOptions] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [error, setError] = useState(false);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();

  useEffect(() => {
    axios.get(`${backendUrl}/optionList`).then((response) => {
      setCryptioOptions(response.data);
    });
  }, []);

  function getStartDate(date: any) {
    const month = date.$d.getUTCMonth() + 1;
    const day = date.$d.getUTCDate() + 1;
    const year = date.$d.getUTCFullYear();
    console.log({
      month,
      day,
      year,
    });
    setMinDate(date);
  }

  function getEndDate(date: any) {
    const month = date.$d.getUTCMonth() + 1;
    const day = date.$d.getUTCDate() + 1;
    const year = date.$d.getUTCFullYear();
    console.log({
      month,
      day,
      year,
    });
    setMaxDate(date);
  }

  function handleInput(input: string) {
    if (input.length >= 30) {
      setError(true);
    } else setError(false);
  }

  function handleSelect(data: any) {
    console.log(data);
    setSelectedOption(data);
  }

  return (
    <div className="app">
      <div className="input-error">
        {error === true ? "There is no cryptocurrency with a name so long" : ""}
      </div>
      <div className="dropdown-container">
        <Select
          options={cryptioOptions}
          placeholder="Search cryptocurrency"
          value={selectedOption}
          onChange={handleSelect}
          isSearchable={true}
          isMulti={false}
          onInputChange={handleInput}
        />
      </div>
      <div className="date-picker-container">
        <div>
          <DatePickerComponent
            label={"Select start date:"}
            onSelect={(date: any) => getStartDate(date)}
            minDate={"none"}
            maxDate={maxDate}
          />
        </div>
        <div>
          <DatePickerComponent
            label={"Select end date:"}
            onSelect={(date: any) => getEndDate(date)}
            minDate={minDate}
            maxDate={"none"}
          />
        </div>
      </div>
    </div>
  );
}
