import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { create, all } from 'mathjs';
import './Produktionsfunktion.css';
import { Tabs, Tab, Box, Typography, Slider } from '@mui/material';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const math = create(all);

function Produktionsfunktion() {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);

  // Generate data for the production function and derivatives
  const generateData = () => {
    
    // Calculate critical points
    const phaseI = (-2 * b) / (6 * a);
    const phaseI_y = 3 * a * Math.pow(phaseI, 2) + 2 * b * phaseI + c;
    const phaseII = (-b) / (2 * a);
    const phaseII_y = (a * Math.pow(phaseII, 3) + b * Math.pow(phaseII, 2) + c * phaseII) / phaseII;
    const p = (2*b) / (3*a)
    const q = c / (3*a)
    const phaseIII = (-p)/2 + Math.pow(Math.pow((p/2),2) - q, 0.5)
    const phaseIII_y = a * Math.pow(phaseIII, 3) + b * Math.pow(phaseIII, 2) + c * phaseIII

    // Critical points for plotting
    const x_values = [phaseI, phaseII, phaseIII];
    const y_values = [phaseI_y, phaseII_y, phaseIII_y];

    const rValues = math.range(0.001, 1.3 * phaseIII, 0.01).toArray();
    const productionValues = rValues.map((r) => a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r);
    
    const derivative1Values = rValues.map((r) => 3 * a * Math.pow(r, 2) + 2 * b * r + c);
    const derivative2Values = rValues.map((r) => 6 * a * r + 2 * b);
    const averageValues = rValues.map((r) => (a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r) / r);
    const y_axis = [-0.2*Math.max(...y_values),1.2 * Math.max(...y_values)]
    return {
      rValues,
      productionValues,
      derivative1Values,
      derivative2Values,
      averageValues,
      x_values,
      y_values,
      y_axis

    };
  };

  const data = generateData();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ textAlign: 'center' }} id="Produktionsfunktion">
      <h2>Produktionsfunktion vom Typ A</h2>
      <BlockMath math={`a r^3 + b r^2 + c r`} />

      {/* Sliders for a, b, and c */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div class="slider">
          <Typography gutterBottom>a:</Typography>
          <Slider
            value={a}
            onChange={(e, newValue) => setA(newValue)}
            min={-10}
            max={0}
            step={0.01}
            valueLabelDisplay="auto"
          />
          
        </div>
        <div class="slider">
          <Typography gutterBottom>b:</Typography>
          <Slider
            value={b}
            onChange={(e, newValue) => setB(newValue)}
            min={0}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
          />
          
        </div>
        <div class="slider">
          <Typography gutterBottom>c:</Typography>
          <Slider
            value={c}
            onChange={(e, newValue) => setC(newValue)}
            min={0}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
          />
          
        </div>
      </div>

      {/* Plotly Plot */}
      <Plot
        data={[
          {
            x: data.rValues,
            y: data.productionValues,
            type: 'scatter',
            mode: 'lines',
            name: 'Production Function',
            line: { color: 'green' }
          },
          {
            x: data.rValues,
            y: data.derivative1Values,
            type: 'scatter',
            mode: 'lines',
            name: 'First Derivative',
            line: { color: 'red' }
          },
          {
            x: data.rValues,
            y: data.derivative2Values,
            type: 'scatter',
            mode: 'lines',
            name: 'Second Derivative',
            line: { color: 'orange' }
          },
          {
            x: data.rValues,
            y: data.averageValues,
            type: 'scatter',
            mode: 'lines',
            name: 'Average Function',
            line: { color: 'blue' }
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
            line: { color: tabIndex === 0 ? 'red' : 'gray', dash: 'dash' },
            showlegend: false
          },
          {
            x: [data.x_values[1], data.x_values[1]],
            y: data.y_axis,
            type: 'scatter',
            mode: 'lines',
            name: 'Phase II Line',
            legendgroup: "phases",
            line: { color: tabIndex === 1 ? 'red' : 'gray', dash: 'dash' },
            showlegend: false
          },
          {
            x: [data.x_values[2], data.x_values[2]],
            y: data.y_axis,
            type: 'scatter',
            mode: 'lines',
            name: 'Phase III Line',
            legendgroup: "phases",
            line: { color: tabIndex === 2 ? 'red' : 'gray', dash: 'dash' },
            showlegend: false
          }
        ]}
        layout={{
          title: 'Kurvenverlauf der Produktionsfunktion',
          xaxis: { title: 'r (Resource Input)', range: [-0.2 * data.phaseIII, 1.3 * data.phaseIII] },
          yaxis: { title: 'Output', range: [data.y_axis[0], data.y_axis[1]] },
          showlegend: true,
          annotations: [
            { x: (data.x_values[0]) / 2, y: data.y_axis[1] * 0.5, text: 'I', showarrow: false, font: { size: 16, color: 'gray' } },
            { x: (data.x_values[0] + data.x_values[1]) / 2, y: data.y_axis[1] * 0.5, text: 'II', showarrow: false, font: { size: 16, color: 'gray' } },
            { x: (data.x_values[1] + data.x_values[2]) / 2, y: data.y_axis[1] * 0.5, text: 'III', showarrow: false, font: { size: 16, color: 'gray' } }
          ]
        }}
        useResizeHandler
        className="plot-container"
      />

      {/* Tabs Section */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Phase 1" />
          <Tab label="Phase 2" />
          <Tab label="Phase 3" />
        </Tabs>
        {tabIndex === 0 && (
          <Box p={3}>
            <Typography variant="h6">Maximum der Grenzproduktivität</Typography>
            <Typography>Ertragskurve:</Typography>
            <BlockMath math={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />
            <Typography>Grenzproduktivität:</Typography>
            <BlockMath math={`x' = \\frac{dx}{dr} = 3${a} r^2 + 2${b} r + ${c}`} />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box p={3}>
            <Typography variant="h6">Maximum des Durchschnittsertrags</Typography>
            <Typography>Durchschnittsertrag:</Typography>
            <BlockMath math={`e = \\frac{x}{r} = \\frac{${a} r^3 + ${b} r^2 + ${c} r}{r}`} />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box p={3}>
            <Typography variant="h6">Maximum der Ertragskurve</Typography>
            <Typography>Notwendige Bedingung für ein Extremum:</Typography>
            <BlockMath math={`x' = \\frac{dx}{dr} = 3${a} r^2 + 2${b} r + ${c} = 0`} />
            <Typography>Lösung der quadratischen Gleichung:</Typography>
            <BlockMath math={`r = -\\frac{p}{2} \\pm \\sqrt{\\frac{p^2}{4} - q}`} />
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Produktionsfunktion;

