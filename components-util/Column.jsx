import React from 'react';
import * as colors from '../src/colors';

export const Column = ({ title, description, children }) => (
  <div
    style={{
      marginRight: 20,
      borderTop: `1px solid ${colors.silver.dark}`,
      width: 300
    }}
  >
    <div
      style={{
        marginTop: 24,
        marginBottom: 4,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.75
      }}
    >
      {title}
    </div>
    <div className="font-sm" style={{ marginBottom: 24 }}>
      {description}
    </div>
    {children}
  </div>
);
