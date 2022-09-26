import React from 'react';

//* Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

//* Include the fusioncharts library
import FusionCharts from 'fusioncharts';

//* Include the chart type
import Charts from 'fusioncharts/fusioncharts.charts';

//* Include the theme as fusion
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';

//* Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Charts, GammelTheme);

export default function ChartComponent({ data }) {
  const chartConfigs = {
    type: 'bar2d', //* The chart type
    width: '100%', //* Width of the chart
    height: '400', //* Height of the chart
    dataFormat: 'json', //* Data type
    dataSource: {
      //* Chart Configuration
      chart: {
        caption: 'Most Forked',
        yAxisName: 'Forked',
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        theme: 'gammel',
        paletteColors: '#2E578B, #4480C5, #CDD8DF,#FBCE3B,#FF8C4E...',
      },
      //* Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}
