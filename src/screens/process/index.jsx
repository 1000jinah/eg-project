import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import Survey from "components/Survey";
import Test from "components/simulation_react/TSimu";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const steps = [
  "Set Your Goal",
  "Check Investment Value",
  "Life and Investment Style",
];

const verticalsteps = ["Life Style", "Investment Style"];
const HorizontalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeVerticalStep, setActiveVerticalStep] = useState(0);
  const [goalName, setGoalName] = useState("Raising to 500$");
  const [account, setAccount] = useState("General Account 140013855416");
  // 인풋(숫자)
  const [pension, setPension] = useState("");
  const [medical, setMedical] = useState("");
  // 버튼
  const [married, setMarried] = useState(null);
  const [smoke, setSmoke] = useState(null);
  // 셀렉트
  const [realEstate, setRealEstate] = useState("No");
  const [childCount, setChildCount] = useState("3 childs");
  const [futureArea, setFutureArea] = useState("Main Centres");
  const [usualMeal, setUsualMeal] = useState("Home Cooked Food");
  const [usualVehicle, setUsualVehicle] = useState("My Own Car");
  // detail display
  const [deleteDetail, setDeleteDetail] = useState(false);
  const handleDeleteDetail = () => {
    setDeleteDetail((prevDeleteDetail) => !prevDeleteDetail);
  };
  const handleShowDetail = () => {
    setDeleteDetail(false);
  };
  const handleGoalNameChange = (event) => {
    setGoalName(event.target.value);
  };

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
  };
  // 인풋(숫자)
  const handlePensionChange = (event) => {
    // Ensure that only numbers are entered
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    setPension(inputValue);
  };
  const handleMedicalChange = (event) => {
    // Ensure that only numbers are entered
    const inputValue = event.target.value.replace(/[^0-9]/g, "");
    setMedical(inputValue);
  };
  // 버튼
  const handleMarriedClick = (value) => {
    setMarried(value);
  };
  const handleSmokeClick = (value) => {
    setSmoke(value);
  };
  // 셀렉트
  const handleRealEstateChange = (event) => {
    setRealEstate(event.target.value);
  };
  const handleChildCountChange = (event) => {
    setChildCount(event.target.value);
  };

  const handleFutureAreaChange = (event) => {
    setFutureArea(event.target.value);
  };
  const handleUsualMealChange = (event) => {
    setUsualMeal(event.target.value);
  };
  const handleUsualVehiChange = (event) => {
    setUsualVehicle(event.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleVerticalNext = () => {
    setActiveVerticalStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleVerticalBack = () => {
    setActiveVerticalStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleVerticalReset = () => {
    setActiveVerticalStep(0);
  };
  return (
    <div style={{ backgroundColor: "#fef8f3", height: "100vh" }}>
      <Header />

      <div>
        {/* Stepper Comp */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {steps.map((label, index) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "25px 0",
              }}
            >
              {index === activeStep ? (
                // 활성 스텝에 해당하는 경우
                <div
                  style={{
                    backgroundColor: "#3d2b80",
                    border: "1px solid #3d2b80",
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginRight: 10,
                  }}
                >
                  {index + 1}
                </div>
              ) : (
                // 비활성 스텝에 해당하는 경우
                <div
                  style={{
                    backgroundColor: "#fef8f3",
                    border: "1px solid #bfbebc",
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    color: "#bfbebc",
                    textAlign: "center",
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginRight: 10,
                  }}
                >
                  {index + 1}
                </div>
              )}
              <div
                style={{
                  fontSize: 14,
                  color: index === activeStep ? "#202225" : "#bfbebc",
                  fontWeight: index !== activeStep ? "normal" : "bold",
                }}
              >
                {label}
              </div>
              {index < steps.length - 1 && ( // 스텝 사이에만 추가
                <div
                  style={{
                    width: 230,
                    height: 1,
                    backgroundColor: "#bfbebc",
                    margin: "0 20px", // 상하 여백 추가
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "#fef8f3",
          }}
        >
          {activeStep === 0 && (
            <div
              style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                width: 1640,
                height: "calc(100vh - 165px)",
                margin: "0 40px 40px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "40px 60px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div
                    style={{
                      border: "1px solid #e6e4e2",
                      borderRadius: 5,
                      padding: 20,
                      marginRight: 15,
                      width: 600,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 22, fontWeight: "bold", mb: 2 }}
                    >
                      What is your goal?
                    </Typography>
                    <Box sx={{ minWidth: 120 }}>
                      <Typography
                        sx={{ fontSize: 16, color: "#202225", mb: 1.5 }}
                      >
                        Goal name
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          sx={{
                            ".MuiSelect-select": {
                              padding: "8px 10px",
                              fontSize: 14,
                            },
                            mb: 3,
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={goalName}
                          onChange={handleGoalNameChange}
                          defaultValue="Raising to 500$"
                        >
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="Raising to 500$"
                          >
                            Raising to 500$
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="Raising to 1000$"
                          >
                            Raising to 1000$
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="Raising to 1500$"
                          >
                            Raising to 1500$
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                      <Typography
                        sx={{
                          fontSize: 16,
                          color: "#202225",
                          marginBottom: 1.5,
                        }}
                      >
                        Select your account
                      </Typography>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                          sx={{
                            ".MuiSelect-select": {
                              padding: "8px 10px",
                              fontSize: 14,
                            },
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={account}
                          onChange={handleAccountChange}
                          defaultValue="General Account 140013855416"
                        >
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="General Account 140013855416"
                          >
                            General Account 140013855416
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="General Account 500003855416"
                          >
                            General Account 500003855416
                          </MenuItem>
                          <MenuItem
                            sx={{ color: "#202225", fontSize: 14 }}
                            value="General Account 787873855416"
                          >
                            General Account 787873855416
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mb: 3,
                      }}
                    >
                      <button
                        style={{
                          color: "#202225",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          border: "none",
                          textTransform: "capitalize",
                          ":hover": {
                            backgroundColor: "transparent",
                          },
                          ":active": {
                            backgroundColor: "transparent",
                          },
                          ":visited": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <span
                          style={{
                            textDecoration: "underline",
                            color: "#202225",
                          }}
                        >
                          Make New Account
                        </span>
                        +
                      </button>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        sx={{
                          color: "#f3f5f7",
                          backgroundColor: "#df3232",
                          textTransform: "capitalize",
                          p: "8px 10px",
                          fontSize: 16,
                          borderRadius: "5px",
                          width: 300,

                          ":hover": {
                            backgroundColor: "#df3232",
                          },
                        }}
                        onClick={handleNext}
                        disabled={activeStep === steps.length - 1}
                      >
                        Continue
                      </Button>
                    </Box>
                  </div>
                  <div
                    style={{
                      border: "1px solid #e6e4e2",
                      borderRadius: 5,
                      padding: 20,
                      width: 400,
                      backgroundColor: "#faf3ec",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 22, fontWeight: "bold", mb: 2 }}
                    >
                      Goal Summary
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16, color: "#202225", mb: 1.5 }}
                    >
                      Your Goal Name
                    </Typography>
                    <TextField
                      sx={{
                        ".MuiOutlinedInput-input": {
                          padding: "8px 10px",
                          fontSize: 14,
                        },
                        width: "100%",
                        backgroundColor: "#fff",
                        mb: 2,
                      }}
                      value={goalName}
                      readOnly
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 14 }}>Your Name</Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        Gill-dong Hong
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 14 }}>Birth Day</Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        1989. 11. 21
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 14 }}>Gender</Typography>
                      <Typography sx={{ fontSize: 14 }}>Male</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: 14 }}>Account</Typography>
                      <Typography sx={{ fontSize: 14 }}>{account}</Typography>
                    </Box>
                  </div>
                </div>
              </div>
              {/* <div>
                <button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  Next
                </button>
              </div> */}
            </div>
          )}
          {activeStep === 1 && (
            <div
              style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                width: 1640,
                height: "calc(100vh - 165px)",
                overflow: "clip",
                margin: "0 40px 40px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "20px 60px",
                }}
              >
                {/* Detail */}
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    marginBottom: 80,
                  }}
                >
                  <button
                    onClick={handleShowDetail}
                    style={{
                      display: deleteDetail === false ? "none" : "block",
                      backgroundColor: "#faf3ec",
                      border: "1px solid #e6e4e2",
                      position: "absolute",
                      borderRadius: 3,
                      top: 18,
                      right: 0,
                      zIndex: 2000,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowDropDownIcon />
                  </button>
                  <div
                    style={{
                      display: deleteDetail === true ? "none" : "block",
                      backgroundColor: "#faf3ec",
                      border: "1px solid #e6e4e2",
                      padding: 12,
                      width: 400,
                      position: "absolute",
                      borderRadius: 4,
                      top: 15,
                      right: 0,
                    }}
                  >
                    <button
                      onClick={handleDeleteDetail}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 0,
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon />
                    </button>
                    <Box
                      sx={{
                        display: "flex",

                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          width: "40%",
                          textAlign: "left",
                        }}
                      >
                        Your Goal Name
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
                      >
                        {goalName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          width: "40%",
                          textAlign: "left",
                        }}
                      >
                        Account
                      </Typography>
                      <Typography
                        onClick={handleReset}
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          textAlign: "left",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {account}
                      </Typography>
                    </Box>
                  </div>
                </div>
                {/* Main */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 0",
                  }}
                >
                  <Test />
                </div>
                {/* Button */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    position: "relative",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      position: "absolute",
                      bottom: 25,
                      color: "#f3f5f7",
                      backgroundColor: "#df3232",
                      textTransform: "capitalize",
                      //   p: "11px 10px",
                      p: "8px 10px",
                      fontSize: 16,
                      borderRadius: "5px",
                      width: 300,

                      ":hover": {
                        backgroundColor: "#df3232",
                      },
                    }}
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                  >
                    Apply
                  </Button>
                  <div>
                    {/* <button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
                  Next
                </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div
              style={{
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                width: 1640,
                height: "calc(100vh - 165px)",
                overflow: "clip",
                margin: "0 40px 40px 40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "40px 60px",
                }}
              >
                {/* Detail */}
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <button
                    onClick={handleShowDetail}
                    style={{
                      display: deleteDetail === false ? "none" : "block",
                      backgroundColor: "#faf3ec",
                      border: "1px solid #e6e4e2",
                      position: "absolute",
                      borderRadius: 3,
                      top: -2,
                      right: 0,
                      zIndex: 2000,
                      cursor: "pointer",
                    }}
                  >
                    <ArrowDropDownIcon />
                  </button>
                  <div
                    style={{
                      display: deleteDetail === true ? "none" : "block",
                      backgroundColor: "#faf3ec",
                      border: "1px solid #e6e4e2",
                      padding: 12,
                      width: 400,
                      position: "absolute",
                      borderRadius: 4,
                      top: -5,
                      right: 0,
                    }}
                  >
                    <button
                      onClick={handleDeleteDetail}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 0,
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <ArrowDropUpIcon />
                    </button>
                    <Box
                      sx={{
                        display: "flex",

                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          width: "40%",
                          textAlign: "left",
                        }}
                      >
                        Your Goal Name
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
                      >
                        {goalName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          width: "40%",
                          textAlign: "left",
                        }}
                      >
                        Account
                      </Typography>
                      <Typography
                        onClick={handleReset}
                        sx={{
                          fontSize: 12,
                          color: "#202225",
                          textAlign: "left",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {account}
                      </Typography>
                    </Box>
                  </div>
                </div>
                {/* Main */}
                <div style={{ display: "flex", height: "100%" }}>
                  <div
                    style={{
                      width: 300,
                      height: "100%",
                      border: "1px solid #e6e4e2",
                      borderRadius: 5,
                      padding: 20,
                      marginRight: 30,
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 22, fontWeight: "bold", mb: 4 }}
                    >
                      About You
                    </Typography>
                    {/* Vertical Stepper Comp */}
                    <div>
                      {verticalsteps.map((label, index) => (
                        <div key={label}>
                          <div
                            style={{ position: "relative", marginBottom: 40 }}
                          >
                            {index === activeVerticalStep ? (
                              // 활성 스텝에 해당하는 경우
                              <div
                                style={{
                                  backgroundColor: "#ffffff",
                                  border: "1px solid #464d77",
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "50%",
                                  color: "#464d77",
                                  textAlign: "center",
                                  fontSize: 14,
                                  lineHeight: "1.6",
                                  marginRight: "10px",
                                  display: "inline-block",
                                }}
                              >
                                {index + 1}
                              </div>
                            ) : (
                              // 비활성 스텝에 해당하는 경우
                              <div
                                style={{
                                  backgroundColor: "#fff",
                                  border: "1px solid #bfbebc",
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "50%",
                                  color: "#bfbebc",
                                  textAlign: "center",
                                  fontSize: 14,
                                  lineHeight: "1.6",
                                  marginRight: "10px",
                                  display: "inline-block",
                                }}
                              >
                                {index + 1}
                              </div>
                            )}
                            <div
                              style={{
                                fontSize: 14,
                                color:
                                  index === activeVerticalStep
                                    ? "#464d77"
                                    : "#bfbebc",
                                fontWeight:
                                  index !== activeVerticalStep
                                    ? "normal"
                                    : "bold",
                                display: "inline-block",
                              }}
                            >
                              {label}
                            </div>
                            {index < verticalsteps.length - 1 && ( // 스텝 사이에만 추가
                              <div
                                style={{
                                  position: "absolute",
                                  width: 1,
                                  height: 30,
                                  backgroundColor: "#bfbebc",
                                  top: 30,
                                  left: 12,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      ))}

                      {activeVerticalStep === verticalsteps.length && (
                        <div style={{ marginTop: "20px" }}>
                          <p>All steps completed - you're finished</p>
                          <button onClick={handleVerticalReset}>Reset</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {activeVerticalStep === 0 && (
                      <div style={{ padding: 20 }}>
                        <Typography
                          sx={{ fontSize: 22, fontWeight: "bold", mb: 3 }}
                        >
                          Your Life Style
                        </Typography>
                        {/* Life Style Sheet */}
                        <Box>
                          {/* Pension */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Pension
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl
                                sx={{
                                  ".MuiOutlinedInput-input": {
                                    padding: "8px 10px",
                                    fontSize: 14,
                                  },
                                  width: "100%",
                                  backgroundColor: "#fff",
                                }}
                                variant="outlined"
                              >
                                <OutlinedInput
                                  value={pension}
                                  onChange={handlePensionChange}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      $
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Real Estate */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Real Estate
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl fullWidth>
                                <Select
                                  sx={{
                                    ".MuiSelect-select": {
                                      padding: "8px 10px",
                                      fontSize: 14,
                                    },
                                  }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={realEstate}
                                  onChange={handleRealEstateChange}
                                  defaultValue="No"
                                >
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="No"
                                  >
                                    No
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="Yes"
                                  >
                                    Yes
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Married */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Married
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <button
                                  style={{
                                    width: "49%",
                                    border: "1px solid #202225",
                                    backgroundColor:
                                      married === "Yes" ? "#3d2b80" : "#fff",
                                    color:
                                      married === "Yes" ? "#fff" : "#202225",
                                    fontSize: 14,
                                    borderRadius: 5,
                                    padding: "11px 10px",
                                  }}
                                  onClick={() => handleMarriedClick("Yes")}
                                >
                                  Yes
                                </button>
                                <button
                                  style={{
                                    width: "49%",
                                    border: "1px solid #202225",
                                    backgroundColor:
                                      married === "No" ? "#3d2b80" : "#fff",
                                    color:
                                      married === "No" ? "#fff" : "#202225",
                                    fontSize: 14,
                                    borderRadius: 5,
                                    padding: "11px 10px",
                                  }}
                                  onClick={() => handleMarriedClick("No")}
                                >
                                  No
                                </button>
                              </div>
                            </Box>
                          </Box>
                          {/* Children */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Children
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl fullWidth>
                                <Select
                                  sx={{
                                    ".MuiSelect-select": {
                                      padding: "8px 10px",
                                      fontSize: 14,
                                    },
                                  }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={childCount}
                                  onChange={handleChildCountChange}
                                  defaultValue="3 childs"
                                >
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="1 childs"
                                  >
                                    1 childs
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="2 childs"
                                  >
                                    2 childs
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="3 childs"
                                  >
                                    3 childs
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Smoke */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Smoke
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <button
                                  style={{
                                    width: "49%",
                                    border: "1px solid #202225",
                                    backgroundColor:
                                      smoke === "Yes" ? "#3d2b80" : "#fff",
                                    color: smoke === "Yes" ? "#fff" : "#202225",
                                    fontSize: 14,
                                    borderRadius: 5,
                                    padding: "11px 10px",
                                  }}
                                  onClick={() => handleSmokeClick("Yes")}
                                >
                                  Yes
                                </button>
                                <button
                                  style={{
                                    width: "49%",
                                    border: "1px solid #202225",
                                    backgroundColor:
                                      smoke === "No" ? "#3d2b80" : "#fff",
                                    color: smoke === "No" ? "#fff" : "#202225",
                                    fontSize: 14,
                                    borderRadius: 5,
                                    padding: "11px 10px",
                                  }}
                                  onClick={() => handleSmokeClick("No")}
                                >
                                  No
                                </button>
                              </div>
                            </Box>
                          </Box>
                          {/* Medical Expenses */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Medical Expenses
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl
                                sx={{
                                  ".MuiOutlinedInput-input": {
                                    padding: "8px 10px",
                                    fontSize: 14,
                                  },

                                  width: "100%",
                                  backgroundColor: "#fff",
                                }}
                                variant="outlined"
                              >
                                <OutlinedInput
                                  value={medical}
                                  onChange={handleMedicalChange}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      $
                                    </InputAdornment>
                                  }
                                />
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Future Residential Area */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Future Residential Area
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl fullWidth>
                                <Select
                                  sx={{
                                    ".MuiSelect-select": {
                                      padding: "8px 10px",
                                      fontSize: 14,
                                    },
                                  }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={futureArea}
                                  onChange={handleFutureAreaChange}
                                  defaultValue="Main Centres"
                                >
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="Main Centres"
                                  >
                                    Main Centres
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="2"
                                  >
                                    2
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="3"
                                  >
                                    3
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Usual Meal */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Usual Meal
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl fullWidth>
                                <Select
                                  sx={{
                                    ".MuiSelect-select": {
                                      padding: "8px 10px",
                                      fontSize: 14,
                                    },
                                  }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={usualMeal}
                                  onChange={handleUsualMealChange}
                                  defaultValue="Home Cooked Food"
                                >
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="Home Cooked Food"
                                  >
                                    Home Cooked Food
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="2"
                                  >
                                    2
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="3"
                                  >
                                    3
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                          {/* Usual Vehicle */}
                          <Box
                            sx={{
                              display: "flex",
                              mb: 3,
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: "#202225",
                                width: 180,
                              }}
                            >
                              Usual Vehicle
                            </Typography>
                            <Box sx={{ minWidth: 500 }}>
                              <FormControl fullWidth>
                                <Select
                                  sx={{
                                    ".MuiSelect-select": {
                                      padding: "8px 10px",
                                      fontSize: 14,
                                    },
                                  }}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={usualVehicle}
                                  onChange={handleUsualVehiChange}
                                  defaultValue="My Own Car"
                                >
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="My Own Car"
                                  >
                                    My Own Car
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="2"
                                  >
                                    2
                                  </MenuItem>
                                  <MenuItem
                                    sx={{ color: "#202225", fontSize: 14 }}
                                    value="3"
                                  >
                                    3
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </Box>
                        </Box>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={{
                              marginTop: 5,
                              fontSize: 14,
                              display: "flex",
                              alignItems: "center",
                              color: "#202225",
                              backgroundColor: "transparent",
                              cursor: "pointer",
                              border: "none",
                              textTransform: "capitalize",
                              ":hover": {
                                backgroundColor: "transparent",
                              },
                              ":active": {
                                backgroundColor: "transparent",
                              },
                              ":visited": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <span
                              style={{
                                textDecoration: "underline",
                                color: "#202225",
                              }}
                            >
                              View More Questions
                            </span>
                            <ArrowDropDownIcon />
                          </button>
                        </div>
                      </div>
                    )}
                    {activeVerticalStep === 1 && (
                      <div style={{ padding: 20, maxWidth: 800 }}>
                        <Typography
                          sx={{ fontSize: 24, fontWeight: "bold", mb: 2 }}
                        >
                          Your Investment Style
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14, color: "#bfbebc", mb: 4 }}
                        >
                          Test your investment style with this quizs.
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14, color: "#df3232", mb: 4 }}
                        >
                          Question 3 of 12
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 17,
                            color: "#202225",
                            mb: 4,
                            lineHeight: 1.65,
                          }}
                        >
                          Your current need for income from your portfolio is an
                          important factor in designing your portfolio. How much
                          will you need to withdraw from your portfolio each
                          year?
                        </Typography>
                        <Survey
                          onClick={handleVerticalBack}
                          disabled={activeVerticalStep === 0}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* <div>
                  <button onClick={handleBack} disabled={activeStep === 0}>
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={activeStep === steps.length - 1}
                  >
                    Next
                  </button>
                </div> */}
                {/* Button */}
                {/* <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={handleVerticalNext}
                    disabled={activeVerticalStep === verticalsteps.length - 1}
                    style={{ marginRight: "10px" }}
                  >
                    {activeVerticalStep === verticalsteps.length - 1
                      ? "Finish"
                      : "Continue"}
                  </button>
                  <button
                    onClick={handleVerticalBack}
                    disabled={activeVerticalStep === 0}
                  >
                    Back
                  </button>
                </div> */}
                <div
                  style={{
                    width: "100%",
                    display: activeVerticalStep === 1 ? "none" : "flex",
                    position: "relative",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    sx={{
                      position: "absolute",
                      border: "1px solid #df3232",
                      boxSizing: "border-box",
                      right: 170,
                      bottom: 0,
                      color: "#df3232",
                      backgroundColor: "#fff",
                      textTransform: "capitalize",
                      p: "8px 10px",
                      fontSize: 16,
                      borderRadius: "5px",
                      width: 150,

                      ":hover": {
                        backgroundColor: "#fff",
                      },
                    }}
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    Back
                  </Button>
                  <Button
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      color: "#f3f5f7",
                      backgroundColor: "#df3232",
                      textTransform: "capitalize",
                      p: "8px 10px",
                      fontSize: 16,
                      borderRadius: "5px",
                      width: 150,

                      ":hover": {
                        backgroundColor: "#df3232",
                      },
                    }}
                    onClick={handleVerticalNext}
                    disabled={activeVerticalStep === verticalsteps.length - 1}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {activeStep === steps.length && (
        <div>
          <p>All steps completed - you're finished</p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default HorizontalStepper;
