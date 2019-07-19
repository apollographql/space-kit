import React from 'react';

export const Page: React.FC<{
  title: string;
  description: string;
}> = ({ title, description, children }) => (
  <div style={{ overflowX: 'auto' }}>
    <div style={{ padding: '42px 22px 42px 42px', width: 'min-content' }}>
      <div style={{ marginBottom: 8 }} className="font-t1 font-semibold">
        {title}
      </div>
      <div style={{ maxWidth: 460, marginBottom: 64 }}>{description}</div>
      <div style={{ display: 'flex', width: 'min-content' }}>{children}</div>
    </div>
  </div>
);
