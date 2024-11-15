import React, { useState } from 'react';
import { create, all } from 'mathjs';
import '../Produktionsfunktion.css';
import { Tabs, Tab, Box, Typography, Slider, Switch } from '@mui/material';
import { InlineMath } from 'react-katex';
import Produktionsplot from './Produktionsplot';
import MathBlock from '../MathBlock';
import 'katex/dist/katex.min.css';
import { formatNumber } from '../../utils/formatting'

const math = create(all);

function Produktionsfunktion({ id }) {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [tabIndex, setTabIndex] = useState(0);
  const [showCalculation, setShowCalculation] = useState(false);

  //Define key functions
  function Ertragsfunktion(r) {
    return a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r;
  }
  function Grenzproduktivität(r) {
    return 3 * a * Math.pow(r, 2) + 2 * b * r + c;
  }
  function Grenzproduktivität_I(r) {
    return 6 * a * r + 2 * b;
  }
  function Durchschnittsertrag(r) {
    return (a * Math.pow(r, 3) + b * Math.pow(r, 2) + c * r) / r;
  }
  function p_q_formula(p, q) {
    return [
      (-p / 2) + Math.pow(Math.pow(p / 2, 2) - q, 0.5),
      (-p / 2) - Math.pow(Math.pow(p / 2, 2) - q, 0.5),
    ];
  }
  //generate Data for Plot and calculations
  const generateData = () => {
    //calculate phase borders and other key points
    const phaseI = (-2 * b) / (6 * a);
    const phaseI_y = Grenzproduktivität(phaseI);
    const phaseII = -b / (2 * a);
    const phaseII_y = Durchschnittsertrag(phaseII);
    const p = (2 * b) / (3 * a);
    const q = c / (3 * a);
    const phaseIII = p_q_formula(p, q)[0];
    const phaseIII_y = Ertragsfunktion(phaseIII);
    const phaseI_Ertrag_y = Ertragsfunktion(phaseI);

    const x_values = [phaseI, phaseII, phaseIII, phaseI];
    const y_values = [phaseI_y, phaseII_y, phaseIII_y, phaseI_Ertrag_y];

    //calculate function values for plotting
    const r_values = math.range(0.001, 1.3 * phaseIII, (1.3 * phaseIII) / 100).toArray();
    const gesamtertrag_values = r_values.map(Ertragsfunktion);
    const grenzertrag_values = r_values.map(Grenzproduktivität);
    const grenzertrag_I_values = r_values.map(Grenzproduktivität_I);
    const durchschnittsertrag_values = r_values.map(Durchschnittsertrag);

    //calculate y_axis range
    const y_axis = [-0.05 * Math.max(...y_values), 1.2 * Math.max(...y_values)];

    return {
      r_values,
      gesamtertrag_values,
      grenzertrag_values,
      grenzertrag_I_values,
      durchschnittsertrag_values,
      x_values,
      y_values,
      y_axis,
      p,
      q,
    };
  };

  const data = generateData();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ textAlign: 'center' }} id={id}>
      <h2>Produktionsfunktion vom Typ A</h2>
      <MathBlock equation={`x = a r^3 + b r^2 + c r`} />
      {/* Sliders for a, b, and c */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <div className="slider">
          <Typography gutterBottom>a:</Typography>
          <Slider
            value={a}
            onChange={(e, newValue) => setA(newValue)}
            min={-10}
            max={-0.1}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider">
          <Typography gutterBottom>b:</Typography>
          <Slider
            value={b}
            onChange={(e, newValue) => setB(newValue)}
            min={0.1}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="slider">
          <Typography gutterBottom>c:</Typography>
          <Slider
            value={c}
            onChange={(e, newValue) => setC(newValue)}
            min={0.1}
            max={10}
            step={0.1}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
      <MathBlock equation={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />

      {/* Toggle Calculation Section */}
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection Column mb={2}>
        <Typography>Berechnung der Phasengrenzen anzeigen:</Typography>
        <Switch checked={showCalculation} onChange={(e) => setShowCalculation(e.target.checked)} />
      </Box>

      {/* Plotly Plot */}
      <div className="plot-phases">
        <div className={`plot-div ${showCalculation ? "" : "full-width"}`}>
          <Produktionsplot data={data} tabIndex={tabIndex} calculation={showCalculation} key={showCalculation ? "visible" : "hidden"} />
        </div>

        {/* Conditionally Render Calculation Section */}
        {showCalculation && (
          <div className="calculation">
            <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 0 }}>
              <Tabs value={tabIndex} onChange={handleTabChange} centered>
                <Tab label="Phase 1" />
                <Tab label="Phase 2" />
                <Tab label="Phase 3" />
              </Tabs>
              {tabIndex === 0 && (
                <Box p={3} sx={{ textAlign: 'left', paddingTop: "0px" }}>
                  <h4>Maximum der Grenzproduktivität</h4>
                  <MathBlock label="Ertragskurve:" equation={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />
                  <MathBlock label="Grenzproduktivität:" equation={`x' = \\frac{dx}{dr} = ${formatNumber(3 * a)}r^2 + ${formatNumber(2 * b)} r + ${c}`} />
                  <MathBlock label="Notwendige Bedingung für ein Extremum" equation={`x'' = \\frac{d^2x}{dr^2} = ${formatNumber(6 * a)} r + ${formatNumber(2 * b)}`} />
                  <MathBlock equation={`r = ${formatNumber(data.x_values[0])}`} />
                  <h4>Einsetzen in:</h4>
                  <MathBlock label="Produktionsfunktion:" equation={`x(r=${formatNumber(data.x_values[0])}) = ${formatNumber(data.y_values[0])}`} />
                  <MathBlock label="Grenzproduktivität:" equation={`x'(r=${formatNumber(data.x_values[0])}) = ${formatNumber(data.y_values[3])}`} />
                </Box>
              )}
              {tabIndex === 1 && (
                <Box p={3} sx={{ textAlign: 'left', paddingTop: "0px" }}>
                  <h4>Maximum des Durchschnittsertrags</h4>
                  <MathBlock label="Ertragskurve:" equation={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />
                  <MathBlock label="Durschnittsertrag:" equation={`x = ${a} r^2 + ${b} r +${c}`} />
                  <MathBlock label="Notwendige Bedingung für ein Extremum" equation={`e' = \\frac{de}{dr} = ${formatNumber(2 * a)} r + ${formatNumber(b)}`} />
                  <MathBlock equation={`r = ${formatNumber(data.x_values[1])}`} />
                  <h4>Einsetzen in:</h4>
                  <MathBlock label="Produktionsfunktion:" equation={`x(r=${formatNumber(data.x_values[1])}) = ${formatNumber(data.y_values[1])}`} />
                  <MathBlock label="Grenzproduktivität:" equation={`x'(r=${formatNumber(data.x_values[1])}) = ${formatNumber(data.y_values[1])}`} />
                  <MathBlock label="Durchschnittsertrag:" equation={`e(r=${formatNumber(data.x_values[1])}) = ${formatNumber(Ertragsfunktion(data.x_values[1]))}`} />
                </Box>
              )}
              {tabIndex === 2 && (
                <Box p={3} sx={{ textAlign: 'left', paddingTop: "0px" }}>
                  <h4>Maximum des Ertragskurve</h4>
                  <MathBlock label="Ertragskurve:" equation={`x = ${a} r^3 + ${b} r^2 + ${c} r`} />
                  <MathBlock label="Notwendige Bedingung für ein Extremum" equation={`x' = \\frac{dx}{dr} = ${formatNumber(3 * a)} r^2 + ${formatNumber(2 * b)} r + ${c} = 0 | : (${formatNumber(3 * a)})`} />
                  <MathBlock equation={`x' = r^2 + ${formatNumber(data.p)} r - ${formatNumber(-data.q)} = 0`}/>
                  <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: '10px' }}>
                    <InlineMath math={`p = ${formatNumber(data.p)}`} />{' '}
                    <InlineMath math={`q = ${formatNumber(data.q)}`} />
                  </div>
                  <MathBlock label="Lösung der quadratischen Gleichung:" equation={`r = -\\frac{p}{2} \\pm \\sqrt{\\frac{p^2}{4} - q}`} />
                  <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginBottom: '10px' }}>
                    <InlineMath math={`r_{1} = ${formatNumber(data.x_values[2])}`} />
                    <div>
                      <InlineMath math={`r_{2} = ${formatNumber((-data.p / 2) - Math.sqrt((data.p / 2) ** 2 - data.q))}< 0`} />
                      <span style={{ color: "red", fontWeight: 600 }}>⚡</span>
                    </div>
                  </div>
                  <h4>Einsetzen in:</h4>
                  <MathBlock label="Produktionsfunktion:" equation={`x(r=${formatNumber(data.x_values[2])}) = ${formatNumber(data.y_values[2])}`} />
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




