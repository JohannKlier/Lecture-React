import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

const MathBlock = ({ label, equation }) => (
  <div style={{ marginBottom: '10px' }}>
    <h5 style = {{margin: 0}}>{label}</h5>
    <BlockMath math={equation} />
  </div>
);

export default MathBlock