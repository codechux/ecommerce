import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormText";

import { commerce } from "../../lib/shop";

const AddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((opt) => ({
    id: opt.id,
    label: `${opt.description} - (${opt.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const { options } = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };
  console.log(fetchShippingOptions);

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      {/* Address form */}
      <Typography variant="h6" gutterBottom>
        Shipping Address
        <FormProvider {...methods}>
          <form onSubmit="">
            <Grid container spacing={3}>
              <FormInput label="First Name" name="firstName" required />
              <FormInput label="Last Name" name="lastName" required />
              <FormInput label="Address" name="address" required />
              <FormInput label="Email" name="email" required />
              <FormInput label="City" name="city" required />
              <FormInput label="Zip/Postal Code" name="zip" required />
              {/* <label htmlFor="name">First Name</label> */}

              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Country</InputLabel>
                <Select
                  value={shippingCountry}
                  fullWidth
                  onChange={(e) => setShippingCountry(e.target.value)}
                >
                  {countries.map((country) => (
                    <MenuItem
                      // component="div"
                      value={country.id}
                      key={country.id}
                    >
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Subdivision</InputLabel>
                <Select
                  value={shippingSubdivision}
                  fullWidth
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {subdivisions.map((subdivision) => (
                    <MenuItem
                      // component="div"
                      value={subdivision.id}
                      key={subdivision.id}
                    >
                      {subdivision.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <InputLabel>Shipping Option</InputLabel>
                <Select
                  value={shippingOption}
                  fullWidth
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {options.map((option) => (
                    <MenuItem
                      // component="div"
                      value={option.id}
                      key={option.id}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid> */}
            </Grid>
          </form>
        </FormProvider>
      </Typography>
    </>
  );
};

export default AddressForm;
