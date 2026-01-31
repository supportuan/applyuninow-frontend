import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  tabs: {
    backgroundColor: '#262938',
    borderRadius: '8px',
    '& .MuiTabs-indicator': {
      background: 'linear-gradient(99.06deg, #07a1c0 5.35%, #99d592 123.96%)',
    },
    '& .MuiTab-root.Mui-selected': {
      background: 'linear-gradient(99.06deg, #07a1c0 5.35%, #99d592 123.96%),#07a1c0',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'audiowide !important',
      fontWeight: '500',
      fontSize: '18px',
      lineHeight: '25px',
    },
    '& .MuiButtonBase-root': { textTransform: 'none' },
  },
});

export const TabPanel = (props) => {
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
        <Box sx={{ pt: '24px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ cols, data }) => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const px = '42px';

  return (
    <Box sx={{ width: '100%' }} className="w-full h-full bg-[#151929]">
      <Box>
        <div>
          <Tabs
            scrollButtons
            allowScrollButtonsMobile
            value={value}
            onChange={handleChange}
            className={classes.tabs}
          >
            {cols.map((col, index) => (
              <Tab
                key={index}
                label={(
                  <span className="font-audiowide text-base">
                    {col.title}
                  </span>
                )}
                sx={{ color: 'white', fontSize: '18px', marginRight: px, lineHeight: '25px' }}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </div>
      </Box>

      {data.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {item}
        </TabPanel>
      ))}
    </Box>
  );
};

BasicTabs.propTypes = {
  cols: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default BasicTabs;