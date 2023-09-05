import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import Select, { SingleValue } from "react-select";
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
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<SelectedOptionProps> | null>(null);
  const [error, setError] = useState(false);
  const [minDate, setMinDate] = useState();
  const [maxDate, setMaxDate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [input, setInput] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("");
  const [graphData, setGraphData] = useState<GraphDataProps | undefined>();

  useEffect(() => {
    axios.get(`${backendUrl}/optionList`).then((response) => {
      setCryptioOptions(response.data);
    });
  }, []);

  function getFormatedDataForGraph() {
    const dataForGraphs = {
      labels: graphData?.dates,
      datasets: [
        {
          label:
            selectedOption !== null
              ? selectedOption.label + " Compared to USDT"
              : "No currency selected",
          data: graphData?.prices,
          fill: false,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };

    return dataForGraphs;
  }

  useEffect(() => {
    let payload = {
      lastInput,
      startDate,
      endDate,
      currency: selectedOption?.value,
    };
    axios.post(`${backendUrl}/getGraphData`, payload).then((response) => {
      setGraphData(response.data);
    });
  }, [endDate, selectedOption, startDate, lastInput]);

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

  function handleSelect(data: SingleValue<SelectedOptionProps>) {
    setLastInput(input);
    setSelectedOption(data);
  }

  return (
    <div className="app">
      <div className="input-error">
        {error === true ? "Input is too long" : ""}
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
          onInputChange={(input) => {
            handleInput(input);
            setInput(input);
          }}
        />
      </div>
      <div className="date-picker-container">
        <div>
          <DatePickerComponent
            label={"Select start date:"}
            onChangeFunction={(date: any) => getStartDate(date)}
            minDate={null}
            maxDate={maxDate}
          />
        </div>
        <div>
          <DatePickerComponent
            label={"Select end date:"}
            onChangeFunction={(date: any) => getEndDate(date)}
            minDate={minDate}
            maxDate={null}
          />
        </div>
      </div>
      <div>
        {graphData !== undefined ? (
          <div className="line-chart-container">
            <Line data={getFormatedDataForGraph()} />
          </div>
        ) : (
          <div className="loading-text-container">
            <p>Select currency and dates</p>
          </div>
        )}
      </div>
    </div>
  );
}
