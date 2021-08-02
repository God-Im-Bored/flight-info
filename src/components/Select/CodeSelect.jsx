import React, { useState } from "react";
import styles from "./CodeSelect.module.css";
import {
  FormControl,
  Input,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

const CodeSelect = ({ options, codeUpdate }) => {
  const [code, setCode] = useState([]);

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
    setCode(event.target.value);
    codeUpdate(event.target.value);
  };

  return (
    <div>
      <FormControl style={{ minWidth: 200 }}>
        <InputLabel id="demo-mutiple-chip-label">Airport(s)</InputLabel>
        <Select
          
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          required
          value={code}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={styles.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={styles.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {options.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  );
};

export default CodeSelect;
