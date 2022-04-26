import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, Grid } from "@material-ui/core";

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  // const isError = false;

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            checked={value}
            label={label}
            // variant="outlined"
            required={required}
          />
        )}
      />
    </Grid>
  );
}

export default FormInput;
