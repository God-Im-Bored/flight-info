import React, { useState } from "react";
import {
    Divider,
    Table,
    TableBody,
    TableContainer,
    TableCell,
    TableHead,
    TableRow,
  } from "@material-ui/core";

  const DataTable = ({ data }) => {
    const headers = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Mean"
    ];



    return (
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {
                  headers.map((h, i) => {
                    return (
                      <TableCell key={i}>{h}</TableCell>
                    );
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data ?
                  Object.keys(data).map((k, i) => {
                    let flightInfo = data[k];
                    // console.log('dataTable flightinfo', flightInfo)
                    // return (
                    //   <TableRow key={i}>
                    //     <TableCell>{flightInfo.code}</TableCell>
                    //     <TableCell>{flightInfo.January.Flights.Total}</TableCell>
                    //     <TableCell>{flightInfo.Febuary.Flights.Total}</TableCell>
                    //     <TableCell>{flightInfo.March.Flights.Total}</TableCell>
                    //     <TableCell>40%</TableCell>
                    //     <TableCell>50%</TableCell>
                    //     <TableCell>60%</TableCell>
                    //     <TableCell>70%</TableCell>
                    //     <TableCell>80%</TableCell>
                    //     <TableCell>90%</TableCell>
                    //     <TableCell>100%</TableCell>
                    //     <TableCell>110%</TableCell>
                    //     <TableCell>120%</TableCell>
                    //     <TableCell>60%</TableCell>
                    //   </TableRow>
                    // );
                  })
                  :
                  null
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }


  export default DataTable
