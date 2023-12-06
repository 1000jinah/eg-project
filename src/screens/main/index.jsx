import { Box, Tabs, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import OutputSimu from "components/simulation_react/OutputSimu";
import SliderSimu from "components/simulation_react/SliderSimu";
import MultiSimu from "components/simulation_react/MultiSimu";
import MonteSimu from "components/simulation_react/MonteSimu";
import Example from "components/simulation_react/Example";
import InvestPlanFive from "components/simulation_react/InvestPlan_Five";
import Test from "components/simulation_react/Test";
import Tests from "components/simulation_react/Tests";
import GetApi from "api/getApi";
import * as React from "react";
import Header from "components/Header";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ m: 3 }}>
      <Header/>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Out" {...a11yProps(0)} />
          <Tab label="Target" {...a11yProps(1)} />
          <Tab label="진행중" {...a11yProps(2)} />
          <Tab label="Other" {...a11yProps(3)} />
          <Tab label="Monte" {...a11yProps(4)} />
          <Tab label="231127" {...a11yProps(5)} />
          <Tab label="231201" {...a11yProps(6)} />
          <Tab label="231204" {...a11yProps(7)} />
          <Tab label="231204" {...a11yProps(8)} />
          <Tab label="api" {...a11yProps(9)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OutputSimu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SliderSimu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        피드백 정리 목록 ( TARGET 기준 )
        <br />
        1. 자동 calculate ⭕
        <br />
        2. 단위값을 클릭시에 input으로 변해서 슬라이더 값을 input으로 변하게 할
        수있게 ⭕
        <br />
        3. 우상향으로 튀는 거<br />
        4. 현재 차트(현황) + 사용자가 조건 설정한 것이 되는지(가능성)
        <br />
        5. z<br />
        6. OUT
        <br />
        6. 현재 월 납입은 은행기준(ex. 병원비 등등 제외)
        <br />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <MultiSimu />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
        <MonteSimu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Example />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <InvestPlanFive />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <Test/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={8}>
        <Tests/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={9}>
        <GetApi/>
      </CustomTabPanel>
    </Box>
  );
};

export default Main;
