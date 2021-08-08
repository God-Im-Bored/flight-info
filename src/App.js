import React from "react";
import styles from "./App.module.css";
import { DataSelect, YearSelect, CodeSelect, DataTable } from "./components";
import { fetchFlightData } from "./api";
import { Button } from "@material-ui/core";

const dataOptions = [
  { name: "number of flights" },
  { name: "% of flights on time" },
  { name: "% of flights canceled" },
  { name: "% of flights diverted" },
  { name: "% of flights delayed" },
  { name: "% of flights delayed due to carrier delay" },
  { name: "% of flights delayed due to late aircraft" },
  { name: "% of flights delayed due to weather" },
  { name: "% of flights delayed due to security" },
  { name: "% of flights delayed due to air traffic control" },
];


class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      codes: [],
      years: [],
      flightData: [],
      selectedData: {},
      optionQuery: "",
      yearQuery: "",
      codeQuery: [],
      isEnabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }

  async componentDidMount() {
    const data = await fetchFlightData();

    this.setState({
      codes: data.codeNames,
      years: Object.keys(data.flightData.ATL),
      flightData: data.flightData,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isEnabled =
      nextState.optionQuery.length > 0 &&
      nextState.yearQuery.length > 0 &&
      nextState.codeQuery.length > 0;
  }

  handleSubmit() {
    // event.preventDefault()
    console.log("submit pressed");
    const { flightData, optionQuery, codeQuery, yearQuery } = this.state;
    const num = parseInt(yearQuery)
    const valid = [];
    const dataOption = dataOptions.find(option => option.name === optionQuery)

    for (let i = 0; i < codeQuery.length; i++) {
     
      if (flightData[codeQuery[i]]) {
        console.log(flightData[codeQuery[i]][num][dataOption.name])
        valid.push(flightData[codeQuery[i]][num][dataOption.name]);
      }
    }

   
    this.setState({ selectedData: valid })
  }

  handleReset() {
    console.log("resssset");
    this.setState({ optionQuery: "", yearQuery: "", codeQuery: [] });
  }

  updateOption(dataOption) {
    this.setState({ optionQuery: dataOption });
  }

  updateYear(yearOption) {
    this.setState({ yearQuery: yearOption });
  }

  updateCode(codeOption) {
    this.setState({ codeQuery: codeOption });
  }

  render() {
    

    console.log(this.state);
    const { codes, years, selectedData } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.select}>
          <h3 className={styles.text}>Show</h3>
          <DataSelect optionUpdate={this.updateOption} dataOptions={dataOptions.map(option => option.name)} />
          <h3 className={styles.text}>for</h3>
          <YearSelect options={years} yearUpdate={this.updateYear} />
          <h3 className={styles.text}>at</h3>
          <CodeSelect options={codes} codeUpdate={this.updateCode} />
        </div>
        <div className={styles.buttons}>
          <Button type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button type="reset" onClick={this.handleReset}>
            Reset
          </Button>
          <div>
            <DataTable data={selectedData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

