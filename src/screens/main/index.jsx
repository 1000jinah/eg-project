import { Box, Tabs, Tab, Typography } from "@mui/material";
import PropTypes from "prop-types";
import OutputSimu from "components/simulation_react/OutputSimu";
import SliderSimu from "components/simulation_react/SliderSimu";
import * as React from "react";
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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Out" {...a11yProps(0)} />
          <Tab label="Target" {...a11yProps(1)} />
          <Tab label="진행중" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OutputSimu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SliderSimu />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        피드백 정리 목록
        <br />
        1. 자동 calculate
        <br />
        2. 단위값을 클릭시에 input으로 변해서 슬라이더 값을 input으로 변하게 할
        수있게
        <br />
        3. 우상향으로 튀는 거<br />
        4. 현재 차트(현황) + 사용자가 조건 설정한 것이 되는지(가능성)
        <br />
        5. <br />
      </CustomTabPanel>
    </Box>
  );
};

export default Main;
