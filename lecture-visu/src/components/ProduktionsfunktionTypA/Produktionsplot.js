import React from 'react';
import Plot from 'react-plotly.js';
import {formatNumber} from '../../utils/formatting'

function ProductionPlot({ data, tabIndex, calculation }) {

  //generate color and text for the points depending on the current tab index
  const color = (index) => (tabIndex === index || !calculation) ? 'red' : 'gray';
  const PointColors = [0, 1, 2, 0].map(color);
  const text = (index, number) => 
    (tabIndex === index || !calculation) 
      ? `P(${formatNumber(data.x_values[number])}/${formatNumber(data.y_values[number])})` 
      : "\u200B";
  const PointText = [[0, 0], [1, 1], [2, 2], [0, 3]].map(([index, number]) => text(index, number));

  return (
    <Plot
      data={[
        //functions
        {
          x: data.r_values,
          y: data.gesamtertrag_values,
          type: 'scatter',
          mode: 'lines',
          name: 'Ertragsfunktion',
          line: { 
            color: (tabIndex === 2 || !calculation)  ? 'green' : 'gray',
            width: (tabIndex === 2 & calculation)   ? 3 : 2 }
        },
        {
          x: data.r_values,
          y: data.grenzertrag_values,
          type: 'scatter',
          mode: 'lines',
          name: 'Grenzproduktivität',
          line: { 
            color: (tabIndex  === 0 || !calculation)  ? 'red' : 'gray',
            width: (tabIndex === 0 & calculation)   ? 3 : 2
           }
        },
        {
          x: data.r_values,
          y: data.grenzertrag_I_values,
          type: 'scatter',
          mode: 'lines',
          name: 'GrenzproduktivitätI',
          line: { color: !calculation  ? 'orange' : 'gray' }
        },
        {
          x: data.r_values,
          y: data.durchschnittsertrag_values,
          type: 'scatter',
          mode: 'lines',
          name: 'Durchschnittsertrag',
          line: { 
            color: (tabIndex  === 1 || !calculation)  ? 'blue' : 'gray',
            width: (tabIndex === 1 & calculation)   ? 3 : 2  }
        },
        
        //phase lines
        {
          x: [data.x_values[0], data.x_values[0]],
          y: data.y_axis,
          type: 'scatter',
          mode: 'lines',
          name: 'Phase I Line',
          legendgroup: "phases",
          line: { color: tabIndex === 0 && calculation ? 'red' : 'gray', dash: 'dash' },
          showlegend: false
        },
        {
          x: [data.x_values[1], data.x_values[1]],
          y: data.y_axis,
          type: 'scatter',
          mode: 'lines',
          name: 'Phase II Line',
          legendgroup: "phases",
          line: { color: tabIndex === 1 && calculation ? 'red' : 'gray', dash: 'dash' },
          showlegend: false
        },
        {
          x: [data.x_values[2], data.x_values[2]],
          y: data.y_axis,
          type: 'scatter',
          mode: 'lines',
          name: 'Phase III Line',
          legendgroup: "phases",
          line: { color: (tabIndex === 2 && calculation) ? 'red' : 'gray', dash: 'dash' },
          showlegend: false
        },
        //phase labels
        {
          x: [(data.x_values[0]) / 2],
          y: [data.y_axis[1] * 0.95],
          type: 'scatter',
          mode: 'text',
          name: 'Phase I Label',
          legendgroup: "phases",
          text: ['I'],
          textfont: { size: 16, color: 'gray' },
          showlegend: false
        },
        {
          x: [(data.x_values[0] + data.x_values[1]) / 2],
          y: [data.y_axis[1] * 0.95],
          type: 'scatter',
          mode: 'text',
          name: 'Phase II Label',
          legendgroup: "phases",
          text: ['II'],
          textfont: { size: 16, color: 'gray' },
          showlegend: false
        },
        {
          x: [(data.x_values[1] + data.x_values[2]) / 2],
          y: [data.y_axis[1] * 0.95],
          type: 'scatter',
          mode: 'text',
          name: 'Phase III Label',
          legendgroup: "phases",
          text: ['III'],
          textfont: { size: 16, color: 'gray' },
          showlegend: false
        },
        //points
        {
          x: data.x_values,
          y: data.y_values,
          type: 'scatter',
          mode: 'markers+text',
          name: 'Critical Points',
          legendgroup: "phases",
          marker: { color: PointColors, size: 8 },
          text: PointText,
          textposition: 'top center',
          textfont: { weight: 'bold' }
        },
      ]}
      layout={{
        xaxis: { title: 'r (Resource Input)', range: [-0.05 * data.x_values[2], 1.3 * data.x_values[2]] },
        yaxis: { title: 'Output', range: [data.y_axis[0], data.y_axis[1]] },
        showlegend: false,
        margin: {
            t: 10,  // Set top margin to 0 to remove the extra space
            l: 30, // Left margin
            r: 10, // Right margin
            b: 40  // Bottom margin
          },
          dragMode: false,
          autosize: true,
          responsive: true,
          
          
        
      }}
      config={{ displayModeBar: false, scrollZoom: false }}
      useResizeHandler = {true}
      className='plot'
      style={{ width: '100%'}}

    />
  
  );
}

export default ProductionPlot;