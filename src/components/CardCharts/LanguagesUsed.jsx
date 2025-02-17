/* eslint-disable */
import React from 'react';

//* Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

//* Include the fusioncharts library
import FusionCharts from 'fusioncharts';

//* Include the chart type
import Charts from 'fusioncharts/fusioncharts.charts';

//* Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

//* Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function ChartComponent({ data }) {
  const chartConfigs = {
    type: 'pie3d', //* The chart type
    width: '100%', //* Width of the chart
    height: '400', //* Height of the chart
    dataFormat: 'json', //* Data type
    dataSource: {
      //* Chart Configuration
      chart: {
        caption: 'Languages',
        theme: 'fusion',
        decimals: 0,
        pieRadius: '45%',
        paletteColors: '#2E578B, #4480C5, #CDD8DF,#FBCE3B,#FF8C4E...',
      },
      //* Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
