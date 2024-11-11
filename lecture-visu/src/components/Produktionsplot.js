import React from 'react';
import Plot from 'react-plotly.js';

function ProductionPlot({ data, tabIndex, calculation }) {
  return (
    
    <Plot
      data={[
        {
          x: data.rValues,
          y: data.productionValues,
          type: 'scatter',
          mode: 'lines',
          name: 'Ertragsfunktion',
          line: { color: (tabIndex === 2 || !calculation)  ? 'green' : 'gray' }
        },
        {
          x: data.rValues,
          y: data.derivative1Values,
          type: 'scatter',
          mode: 'lines',
          name: 'Grenzproduktivität',
          line: { color: (tabIndex  === 0 || !calculation)  ? 'red' : 'gray' }
        },
        {
          x: data.rValues,
          y: data.derivative2Values,
          type: 'scatter',
          mode: 'lines',
          name: 'GrenzproduktivitätI',
          line: { color: !calculation  ? 'orange' : 'gray' }
        },
        {
          x: data.rValues,
          y: data.averageValues,
          type: 'scatter',
          mode: 'lines',
          name: 'Durchschnittsertrag',
          line: { color: (tabIndex  === 1 || !calculation)  ? 'blue' : 'gray'  }
        },
        {
          x: data.x_values,
          y: data.y_values,
          type: 'scatter',
          mode: 'markers+text',
          name: 'Critical Points',
          legendgroup: "phases",
          marker: { color: 'purple', size: 8 },
          text: ['Phase I', 'Phase II', 'Phase III'],
          textposition: 'top center'
        },
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
        {
          x: [(data.x_values[0]) / 2],
          y: [data.y_axis[1] * 0.5],
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
          y: [data.y_axis[1] * 0.5],
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
          y: [data.y_axis[1] * 0.5],
          type: 'scatter',
          mode: 'text',
          name: 'Phase III Label',
          legendgroup: "phases",
          text: ['III'],
          textfont: { size: 16, color: 'gray' },
          showlegend: false
        }
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
