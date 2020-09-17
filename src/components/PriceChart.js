import React from 'react';
import { LineChart, Line } from 'recharts';


const culcIsPositive = (value) => {
  switch (true) {
    case value > 0:
      return true;
    case value < 0:
      return false;
    default:
      return true;
  }
};
const culcChartColor = (value) => {
  let parsedValue = new Intl.NumberFormat('en-US', { style: 'percent' })
    .format(value)
    .replace('%', '');
  parsedValue = (parsedValue === '-0') ? 0 : Number(parsedValue);

  switch (true) {
    case parsedValue > 0:
      return '#35c935';
    case parsedValue < 0:
      return '#f01818';
    default:
      return '#5c5c5c';
  }
};
const culcStartPoint = (isPositive, price, priceChanges) =>
  isPositive
    ? Number(price) - Number(priceChanges)
    : Number(price) + Number(priceChanges.replace('-', ''));


const PriceChart = ({ price, priceChanges, priceChangesPct }) => {
  const isPositive = culcIsPositive(priceChanges);
  const startPoint = culcStartPoint(isPositive, price, priceChanges);
  const data = [
    { name: 'Page A', uv: startPoint, pv: 300, amt: 300 },
    { name: 'Page B', uv: price, pv: 300, amt: 300 },
  ];

  return (
    
      <LineChart width={100} height={40} data={data}>
        <Line
          type='monotone'
          dataKey='uv'
          stroke={culcChartColor(priceChangesPct)}
        />
      </LineChart>
    
  );
};

export default PriceChart;

