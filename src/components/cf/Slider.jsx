// SliderComponent.jsx
import React from "react";
import { Box, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#211d1d" : "#211d1d",
  padding: "15px 0",
  "& .MuiSlider-root": {
    height: "1px",
    padding: "0px",
  },
  "& .MuiSlider-thumb": {
    height: 22,
    width: 22,
    "&:focus, &:hover, &.Mui-active": {
      width: 22,
      height: 22,
      "@media (hover: none)": {
        // boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: theme.palette.mode === "dark" ? "#fff" : "#211d1d",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    background: "transparent",
  },
  "& .MuiSlider-rail": {
    opacity: "1",
    height: "1px",
    backgroundColor: "#211d1d",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#211d1d",
    height: 8,
    width: 1,
  },
}));

const SliderComponent = ({
  label,
  value,
  onChange,
  min,
  max,
  displayValue,
  calculateValue, // Access the calculateValue function here
  valueLabelFormat,
}) => {
  const marks = [
    // { value: min },
    // { value: (max - min) / 4 + min },
    // { value: ((max - min) / 4) * 2 + min },
    // { value: ((max - min) / 4) * 3 + min },
    // // { value: ((max - min) / 5) * 4 + min },
    // { value: max },
  ];
  return (
    <Box sx={{ width: "100%", p: 3.5, mb: 3, backgroundColor: "#eee" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} mb={1.5}>
        <Typography
          variant="span"
          fontSize={"16px"}
          fontWeight={"bold"}
          mb={0}
          color={"#808080"}
          id="non-linear-slider"
          gutterBottom
        >
          {label}
        </Typography>

        <Typography
          variant="h5"
          fontSize={"16px"}
          fontWeight={"bold"}
          color={"#808080"}
        >
          {displayValue}
        </Typography>
      </Box>

      <IOSSlider
        marks={marks}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="off"
      />
    </Box>
  );
};

export default SliderComponent;
