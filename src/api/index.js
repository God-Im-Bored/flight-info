import axios from "axios";

const url = "https://flare-code-exercise-data.s3.amazonaws.com/airlines.json";

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
    months = [...new Set(months)];

    for (let i = 0; i < data.length; i++) {
      const flight = data[i];
      const code = flight.Airport.Code;

      const year = flight.Time.Year;
      const month = flight.Time["Month Name"];
      const delays = flight.Statistics["# of Delays"];
      const flights = flight.Statistics.Flights;

      if (!metaData.flightData[flight.Airport.Code][year]) {
        metaData.flightData[flight.Airport.Code][year] = {
          code: code,
          "number of flights": [],
          "% of flights on time": [],
          "% of flights canceled": [],
          "% of flights diverted": [],
          "% of flights delayed": [],
          "% of flights delayed due to carrier delay": [],
          "% of flights delayed due to late aircraft": [],
          "% of flights delayed due to weather": [],
          "% of flights delayed due to security": [],
          "% of flights delayed due to air traffic control": [],
        };
      }
      const flightYear = metaData.flightData[flight.Airport.Code][year];

      // number of flights calc
      flightYear["number of flights"][month] = flights.Total;
      if (!flightYear["number of flights"].total)
        flightYear["number of flights"].total = 0;
      flightYear["number of flights"].total += flights.Total;

      // % of flights on time calc
      flightYear["% of flights on time"][month] =
        Number(((flights["On Time"] / flights.Total) * 100).toFixed(2))
      if (!flightYear["% of flights on time"].total)
        flightYear["% of flights on time"].total = 0;
      flightYear["% of flights on time"].total += flights["On Time"];
      flightYear["% of flights on time"].mean =
        Number(((
          flightYear["% of flights on time"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(1))

      // % of flights canceled calc
      flightYear["% of flights canceled"][month] =
        Number(((flights.Cancelled / flights.Total) * 100).toFixed(2))
      if (!flightYear["% of flights canceled"].total)
        flightYear["% of flights canceled"].total = 0;
      flightYear["% of flights canceled"].total += flights.Cancelled;
      flightYear["% of flights canceled"].mean =
        Number(((
          flightYear["% of flights canceled"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(3))

      // % of flights diverted calc
      flightYear["% of flights diverted"][month] =
        Number(((flights.Diverted / flights.Total) * 100).toFixed(3))
      if (!flightYear["% of flights diverted"].total)
        flightYear["% of flights diverted"].total = 0;
      flightYear["% of flights diverted"].total += flights.Diverted;
      flightYear["% of flights diverted"].mean =
        Number(((
          flightYear["% of flights diverted"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(4))

      // % of flights delayed calc
      flightYear["% of flights delayed"][month] =
        Number(((flights.Delayed / flights.Total) * 100).toFixed(2))
      if (!flightYear["% of flights delayed"].total)
        flightYear["% of flights delayed"].total = 0;
      flightYear["% of flights delayed"].total += flights.Delayed;
      flightYear["% of flights delayed"].mean =
        Number(((
          flightYear["% of flights delayed"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(2))

      // % of flights delayed due to carrier delay calc
      flightYear["% of flights delayed due to carrier delay"][month] =
        Number(((delays.Carrier / flights.Total) * 100).toFixed(2))
      if (!flightYear["% of flights delayed due to carrier delay"].total)
        flightYear["% of flights delayed due to carrier delay"].total = 0;
      flightYear["% of flights delayed due to carrier delay"].total +=
        delays.Carrier;
      flightYear["% of flights delayed due to carrier delay"].mean =
        Number(((
          flightYear["% of flights delayed due to carrier delay"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(2))

      // % of flights delayed due to late aircraft calc
      flightYear["% of flights delayed due to late aircraft"][month] =
        Number(((delays["Late Aircraft"] / flights.Total) * 100).toFixed(2))
      if (!flightYear["% of flights delayed due to late aircraft"].total)
        flightYear["% of flights delayed due to late aircraft"].total = 0;
      flightYear["% of flights delayed due to late aircraft"].total +=
        delays["Late Aircraft"];
      flightYear["% of flights delayed due to late aircraft"].mean =
        Number(((
          flightYear["% of flights delayed due to late aircraft"].total /
          flightYear["number of flights"].total
        ) * 100).toFixed(2))

      // % of flights delayed due to weather calc
      flightYear["% of flights delayed due to weather"][month] =
        delays.Weather / flights.Total;
      flightYear["% of flights delayed due to weather"][month] = Number(
        ((delays.Weather / flights.Total) * 100).toFixed(2)
      );
      if (!flightYear["% of flights delayed due to weather"].total)
        flightYear["% of flights delayed due to weather"].total = 0;
      flightYear["% of flights delayed due to weather"].total += delays.Weather;
      flightYear["% of flights delayed due to weather"].mean = Number(
        (
          (flightYear["% of flights delayed due to weather"].total /
            flightYear["number of flights"].total) *
          100
        ).toFixed(3)
      );

      // % of flights delayed due to security calc
      flightYear["% of flights delayed due to security"][month] =
        delays.Security / flights.Total;
      flightYear["% of flights delayed due to security"][month] = Number(
        ((delays.Security / flights.Total) * 100).toFixed(2)
      );
      if (!flightYear["% of flights delayed due to security"].total)
        flightYear["% of flights delayed due to security"].total = 0;
      flightYear["% of flights delayed due to security"].total +=
        delays.Security;
      flightYear["% of flights delayed due to security"].mean = Number(
        (
          (flightYear["% of flights delayed due to security"].total /
            flightYear["number of flights"].total) *
          100
        ).toFixed(2)
      );

      // % of flights delayed due to NAS calc
      flightYear["% of flights delayed due to air traffic control"][month] =
        delays["National Aviation System"] / flights.Total;
      flightYear["% of flights delayed due to air traffic control"][month] =
        Number(
          ((delays["National Aviation System"] / flights.Total) * 100).toFixed(
            1
          )
        );
      if (!flightYear["% of flights delayed due to air traffic control"].total)
        flightYear["% of flights delayed due to air traffic control"].total = 0;
      flightYear["% of flights delayed due to air traffic control"].total +=
        delays["National Aviation System"];
      flightYear["% of flights delayed due to air traffic control"].mean =
        (
          flightYear["% of flights delayed due to air traffic control"].total /
          flightYear["number of flights"].total
        ).toFixed(3) * 100;
    }

    // console.log('metaData.flightData =', metaData);
    return metaData;
  } catch (err) {
    console.error(err);
  }
};
