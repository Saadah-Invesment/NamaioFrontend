
declare module 'react-gauge-chart' {
  import React from 'react';
  interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    colors?: string[];
    percent: number;
    arcWidth?: number;
    textColor?: string;
    style?: React.CSSProperties;
  }
  const GaugeChart: React.FC<GaugeChartProps>;
  export default GaugeChart;
}