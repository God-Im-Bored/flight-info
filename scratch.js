for (let i = 0; i < data.length; i++) {
    let year = data[i].Time.Year
    // console.log(year)
    let month = data[i].Time['Month Name']
    let delays = data[i].Statistics['# of Delays']
    let flights = data[i].Statistics.Flights

    months.push(month)
    const filteredMonths = [...new Set(months)]

    metaData.flightData[data[i].Airport.Code][year] = {}

    let flightYear = metaData.flightData[data[i].Airport.Code][year]

    // console.log(222, flightYear)
    

    filteredMonths.map((month, idx) => {
        
       return flightYear[month] = {delays: {}, flights: {}}

        // flightYear[month].delays = delays
        // flightYear[month].flights = flights
    })
}


 {/* 
      <Autocomplete
        id="data-options-list"
        className={styles.root}
        options={dataOptions}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Data Option"
            value={option}
            variants="outlined"
            onSelect={(e) => setOption(e.target.value)}
            onChange={handleChange}
          />
        )}
      /> */}



          {/* <Autocomplete
        id="year-options-list"
        className={styles.root}
        options={options}
        getOptionLabel={(year) => year}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Year"
            value={year}
            variants="outlined"
            onSelect={(e) => setYear(e.target.value)}
            onChange={handleChange}
          />
        )}
      />


      disabled={!this.state.isEnabled} 