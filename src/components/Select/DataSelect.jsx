import React, { useState } from "react";
import styles from "./DataSelect.module.css";

import {
  FormControl,
  Input,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const DataSelect = ({ optionUpdate }) => {
  const [option, setOption] = useState("");

  const dataOptions = [
    "number of flights",
    "% of flights on time",
    "% of flights canceled",
    "% of flights diverted",
    "% of flights delayed",
    "% of flights delayed due to carrier delay",
    "% of flights delayed due to late aircraft",
    "% of flights delyaed due to weather",
    "% of flights delayed due to security",
    "% of flights delayed due to air traffic control",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    setOption(event.target.value);
    optionUpdate(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ minWidth: 200 }}>
        <InputLabel id="data-option-select">Option</InputLabel>
        <Select
         
          labelId="data-option-select"
          id="data-option"
          required
          value={option}
          onChange={handleChange}
          input={<Input id="select-option-single" />}
          renderValue={(selected) => (
            <div className={styles.chips}>
              <Chip key={selected} label={selected} className={styles.chip} />
            </div>
          )}
          MenuProps={MenuProps}
        >
          {dataOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormHelperText>Required</FormHelperText>
    </div>
  );
};

export default DataSelect;
