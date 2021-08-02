import axios from "axios";

const url =
  "https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json";

export const fetchFlightData = async () => {
  let arrCodes = [],
    metaData = {},
    months = [];

  metaData.flightData = [];
  metaData.codeNames = [];

  try {
    const { data } = await axios.get(url);

    data.forEach((flight, idx) => {
      if (flight.Airport.Code) {
        const month = flight.Time["Month Name"];
        const code = flight.Airport.Code;

        metaData.flightData[flight.Airport.Code] = {};

        months.push(month);
        arrCodes.push(code);
      }
    });

    metaData.codeNames = [...new Set(arrCodes)];

    for (let i = 0; i < data.length; i++) {
      const flight = data[i];
      const code = flight.Airport.Code
      

      const year = flight.Time.Year;
      const month = flight.Time["Month Name"];
      const delays = flight.Statistics["# of Delays"];
      const flights = flight.Statistics.Flights;

      metaData.flightData[flight.Airport.Code][year] = {code: code};
      const flightYear = metaData.flightData[flight.Airport.Code][year];

      months.push(month);
      const filteredMonths = [...new Set(months)];

      filteredMonths.map((month, idx) => {
        flightYear[month] = { Delays: {}, Flights: {} };
        flightYear[month].Delays = delays;
        flightYear[month].Delays["Total"] =
          delays.Carrier +
          delays["Late Aircraft"] +
          delays["National Aviation System"] +
          delays.Security +
          delays.Weather;
        flightYear[month].Flights = flights;
      });
    }

    return metaData
  } catch (err) {
    console.error(err);
  }
};
