import React from 'react';
import { colors } from '../index';

export const Column = ({ title, description, children }) => (
  <div
    style={{
      flex: 0,
      marginRight: 20,
      borderTop: `1px solid ${colors.silver.dark}`
    }}
  >
    <div className="font-lbl" style={{ marginTop: 24, marginBottom: 4 }}>
      {title}
    </div>
    <div className="font-sm" style={{ marginBottom: 24 }}>
      {description}
    </div>
    {children}
  </div>
);
