import React, { useState } from "react";
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  Button,
} from "@mui/material";

const Survey = ({ disabled, onClick }) => {
  const surveyData = [
    {
      title: "Income Needs",
      subtitle:
        "Your current need for income from your portfolio is an important factor in designing your portfolio. How much will you need to withdraw from your portfolio each year?",
      goalChoose: [
        { title: "0%" },
        { title: "0% - 2%" },
        { title: "2% - 4%" },
        { title: "4% - 5%" },
        { title: "Higher than 5%" },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData = surveyData[currentIndex];
  const [selectedValue, setSelectedValue] = useState("");
  const [resultData, setResultData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState({});

  const handleNext = () => {
    let canContinue = false;

    if (currentIndex === 0 && selectedItemIndex !== null) {
      canContinue = true;
      setSelectedValue(currentData.goalChoose[selectedItemIndex].title);
    } else if (currentIndex === 1) {
      const radioName = `radio_${currentIndex}`;
      const selectedRadio = document.querySelector(
        `input[name="${radioName}"]:checked`
      );
      if (selectedRadio) {
        canContinue = true;
        setSelectedValue(selectedRadio.value);
      }
    } else if (currentIndex === 2 && inputValue.trim() !== "") {
      canContinue = true;
      setSelectedValue(inputValue);
    } else if (currentIndex >= 3) {
      const radioName = `radio_${currentIndex}`;
      const selectedRadio = document.querySelector(
        `input[name="${radioName}"]:checked`
      );
      if (selectedRadio) {
        canContinue = true;
        setSelectedValue(selectedRadio.value);
      }
    }

    if (canContinue) {
      const updatedResultData = [...resultData];
      updatedResultData[currentIndex] = selectedValue;
      setResultData(updatedResultData);
      setCurrentIndex(currentIndex + 1);
      setSelectedItemIndex(null);

      if (currentIndex === surveyData.length - 1) {
        localStorage.setItem(
          "survey-demo-result",
          JSON.stringify(updatedResultData)
        );
      }

      setSelectedValues((prevValues) => ({
        ...prevValues,
        [currentIndex]: selectedValue,
      }));
    }
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [currentIndex]: event.target.value,
    }));
  };

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
    setSelectedValue(currentData.goalChoose[index].title);
    if (currentIndex === 1 || currentIndex >= 3) {
      const radioName = `radio_${currentIndex}`;
      const radioElement = document.querySelector(
        `input[name="${radioName}"][value="${index}"]`
      );

      if (radioElement) {
        radioElement.checked = true;
      }
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedValue(event.target.value);
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [currentIndex]: event.target.value,
    }));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedValue(selectedValues[currentIndex - 1]);
    }
  };

  return (
    <Box>
      <Box sx={{ height: "100%" }}>
        {currentIndex !== null && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <Box sx={{ my: 2 }}>{currentData.surveyImg}</Box>
            {currentData.goalChoose.map((item, index) => (
              <Box>
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    onClick={() => {
                      handleItemClick(index);
                      handleChange({ target: { value: item.title } });
                    }}
                    sx={{
                      mb: 2.5,
                      p: 0.75,
                      cursor: "pointer",
                      border: "1px solid #e6e4e2",
                      display: "flex",
                      minWidth:
                        currentIndex === 6
                          ? 650
                          : currentIndex === 8
                          ? 800
                          : currentIndex === 10
                          ? 650
                          : currentIndex === 11
                          ? 650
                          : currentIndex === 12
                          ? 650
                          : 450,
                      width: "auto",
                      whiteSpace: "nowrap",
                      position: "relative",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      sx={{ position: "absolute", left: 10 }}
                      value={item.title}
                      control={
                        <Radio
                          checked={selectedValue === item.title}
                          value={item.title}
                          sx={{
                            "&.Mui-checked": { color: "#211d1d" },
                          }}
                          name={`radio_${currentIndex}`}
                        />
                      }
                    />
                    <Typography
                      sx={{
                        color: "#202225",
                        fontSize: 14,
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
                {index === 4 && (
                  <Button
                    sx={{
                     
                      color: "#bfbebc",
                      textTransform: "capitalize",
                    }}
                    onClick={onClick}
                    disabled={disabled}
                  >
                    Back
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Survey;
