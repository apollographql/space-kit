import React from 'react';

export const Page = ({ title, description, children }) => (
  <div style={{ padding: 42 }}>
    <div class="font-t1 font-semibold" style={{ marginBottom: 8 }}>
      {title}
    </div>
    <div style={{ maxWidth: 460, marginBottom: 64 }}>{description}</div>
    <div style={{ display: 'flex' }}>{children}</div>
  </div>
);
