import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import Select from "react-select";
import axios from "axios";
import DatePickerComponent from "./components/DatePicker";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js/auto";

const backendUrl = "http://localhost:3600";

type SelectedOptionProps = {
  value: string;
  label: string;
};

type GraphDataProps = {
  dates: string[];
  prices: number[];
};

Chart.register(CategoryScale);

export default function App() {
  const [cryptioOptions, setCryptioOptions] = useState();
  const [selectedOption, setSelectedOption] = useState<
    SelectedOptionProps | undefined
  >(undefined);
  const [error, setError] = useState(false);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [graphData, setGraphData] = useState<GraphDataProps | undefined>();

  useEffect(() => {
    axios.get(`${backendUrl}/optionList`).then((response) => {
      setCryptioOptions(response.data);
    });
  }, []);

  function getPricesAndDates() {
    const testData = {
      labels: graphData?.dates,
      datasets: [
        {
          label:
            selectedOption !== undefined
              ? selectedOption.label
              : "No currency selected",
          data: graphData?.prices,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    return testData;
  }

  console.log();

  useEffect(() => {
    let payload = {
      startDate,
      endDate,
      currency: selectedOption?.value,
    };
    axios.post(`${backendUrl}/`, payload).then((response) => {
      setGraphData(response.data);
    });
  }, [endDate, selectedOption, startDate]);

  console.log(graphData);
  function getStartDate(date: any) {
    const selecedDate = date.$d.toISOString();
    setStartDate(selecedDate);
    setMinDate(date);
  }

  function getEndDate(date: any) {
    const selecedDate = date.$d.toISOString();
    setEndDate(selecedDate);
    setMaxDate(date);
  }

  function handleInput(input: string) {
    if (input.length >= 30) {
      setError(true);
    } else setError(false);
  }

  function handleSelect(data: any) {
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
          noOptionsMessage={() =>
            !cryptioOptions ? "Loading options" : "No options"
          }
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
            onChangeFunction={(date: any) => getStartDate(date)}
            minDate={"none"}
            maxDate={maxDate}
          />
        </div>
        <div>
          <DatePickerComponent
            label={"Select end date:"}
            onChangeFunction={(date: any) => getEndDate(date)}
            minDate={minDate}
            maxDate={"none"}
          />
        </div>
      </div>
      <div>
        {graphData !== undefined ? (
          <Line data={getPricesAndDates()}></Line>
        ) : (
          <div>No available data</div>
        )}
      </div>
    </div>
  );
}
