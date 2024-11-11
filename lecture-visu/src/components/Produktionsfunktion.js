import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { create, all } from 'mathjs';
import './Produktionsfunktion.css';
import { Tabs, Tab, Box, Typography, Slider, Switch } from '@mui/material';
import { BlockMath, InlineMath } from 'react-katex';
import Produktionsplot from './Produktionsplot';
import 'katex/dist/katex.min.css';

const math = create(all);

function Produktionsfunktion({id}) {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const [showCalculation, setShowCalculation] = useState(false); // New state for toggling calculation


  // Generate data for the production function and derivatives
  const generateData = () => {
    
    const phaseI = (-2 * b) / (6 * a);
    const phaseI_y = 3 * a * Math.pow(phaseI, 2) + 2 * b * phaseI + c;
    const phaseII = (-b) / (2 * a);
    const phaseII_y = (a * Math.pow(phaseII, 3) + b * Math.pow(phaseII, 2) + c * phaseII) / phaseII;
    const p = (2*b) / (3*a)
    const q = c / (3*a)
    const phaseIII = (-p)/2 + Math.pow(Math.pow((p/2),2) - q, 0.5)
    const phaseIII_y = a * Math.pow(phaseIII, 3) + b * Math.pow(phaseIII, 2) + c * phaseIII

    const x_values = [phaseI, phaseII, phaseIII];
    const y_values = [phaseI_y, phaseII_y, phaseIII_y];

    const rValues = math.range(0.001, 1.3 * phaseIII, (1.3 * phaseIII) / 100).toArray();
    const productionValues = rValues.map((r) => a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r);
    
    const derivative1Values = rValues.map((r) => 3 * a * Math.pow(r, 2) + 2 * b * r + c);
    const derivative2Values = rValues.map((r) => 6 * a * r + 2 * b);
    const averageValues = rValues.map((r) => (a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r) / r);
    const y_axis = [-0.05*Math.max(...y_values),1.2 * Math.max(...y_values)]

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
    <div style={{ textAlign: 'center' }} id = {id}>
      <h2>Produktionsfunktion vom Typ A</h2>
      <BlockMath math={`x = a r^3 + b r^2 + c r`} />
      <BlockMath math={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />

      {/* Sliders for a, b, and c */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="slider">
          <Typography gutterBottom>a:</Typography>
          <Slider value={a} onChange={(e, newValue) => setA(newValue)} min={-10} max={-0.1} step={0.1} valueLabelDisplay="auto" />
        </div>
        <div className="slider">
          <Typography gutterBottom>b:</Typography>
          <Slider value={b} onChange={(e, newValue) => setB(newValue)} min={0.1} max={10} step={0.1} valueLabelDisplay="auto" />
        </div>
        <div className="slider">
          <Typography gutterBottom>c:</Typography>
          <Slider value={c} onChange={(e, newValue) => setC(newValue)} min={0} max={10} step={0.1} valueLabelDisplay="auto" />
        </div>
      </div>

      {/* Toggle Calculation Section */}
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Typography>Rechenweg anzeigen:</Typography>
        <Switch checked={showCalculation} onChange={(e) => setShowCalculation(e.target.checked)} />
      </Box>

      {/* Plotly Plot */}
      <div className="plot-phases">
        <div className = {`plot-div ${showCalculation ? "" : "full-width"}`}>
          <Produktionsplot data={data} tabIndex={tabIndex} calculation={showCalculation} key = {showCalculation ? "visible" : "hidden"}/>
        </div>
        
        

        {/* Conditionally Render Calculation Section */}
        {showCalculation && (
          <div className="calculation">
            <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 3 }}>
              <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Phase 1" />
                <Tab label="Phase 2" />
                <Tab label="Phase 3" />
              </Tabs>
              {tabIndex === 0 && (
                <Box p={3} sx={{ textAlign: 'left', paddingTop:"0px"}}>
                  <h5>Maximum der Grenzproduktivität</h5>
                  <p>Ertragskurve:</p>
                  <BlockMath math={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />
                  <p>Grenzproduktivität:</p>
                  <BlockMath math={`x' = \\frac{dx}{dr} = ${(3*a).toFixed(1)}r^2 + ${(2 * b).toFixed(1)} r + ${c}`} />
                  <p>Notwendige Bedingung für ein Extremum</p>
                  <BlockMath math={`x'' = \\frac{d^2x}{dr^2} = ${(6 * a).toFixed(1)} r + ${(2 * b).toFixed(1)}`} />
                  <p className="solution">r = {Math.round(data.x_values[0] * 100) / 100}</p>
                  <h5>Einsetzen in:</h5>
                  <p>Produktionsfunktion:</p>
                  <BlockMath math={`x(r=${Math.round(data.x_values[0] * 100) / 100}) =  ${Math.round(data.x_values[1] * 100) / 100}`} />
                  <p>Grenzproduktivität:</p>
                  <BlockMath math={`x'(r=${Math.round(data.x_values[0] * 100) / 100}) = ${Math.round(data.x_values[1] * 100) / 100}`} />
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
        )}
      </div>
    </div>
  );
}

export default Produktionsfunktion;

