import React, { useState } from "react";
import styles from "./YearSelect.module.css";
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const YearSelect = ({ options, yearUpdate }) => {
  const [year, setYear] = useState("");

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
    setYear(event.target.value);
    yearUpdate(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ minWidth: 200 }}>
        <InputLabel id="year-option-select">Option</InputLabel>
        <Select
          
          labelId="year-option-select"
          id="year-option"
          required
          value={year}
          onChange={handleChange}
          input={<Input id="select-year-single" />}
          renderValue={(selected) => (
            <div className={styles.chips}>
              <Chip key={selected} label={selected} className={styles.chip} />
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
};

export default YearSelect;
