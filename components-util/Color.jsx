import React from 'react';
import classnames from 'classnames';
import * as colors from '../src/colors';

export const Flag = ({ small, light, pass }) => (
  <div
    className={classnames('font-semibold', small ? 'font-sm' : '')}
    style={{
      display: 'inline-block',
      textAlign: 'center',
      width: 40,
      marginLeft: 10,
      color: light ? colors.white : colors.black.base
    }}
  >
    <div>A</div>
    <Tag bool={pass} />
  </div>
);

export const Tag = ({ bool }) => (
  <div
    className="font-lbl font-code"
    style={{
      borderRadius: 2,
      color: colors.white,
      backgroundColor: colors.black.base
    }}
  >
    {bool ? 'PASS' : 'FAIL'}
  </div>
);

export const Patch = ({ color, label, text, flag, flags }) => (
  <div
    style={{
      backgroundColor: color,
      height: 100,
      borderRadius: 4,
      marginTop: 20,
      padding: 8,
      display: 'flex',
      position: 'relative',
      alignItems: 'flex-end',
      color: text ? colors.white : colors.black.base
    }}
  >
    {flag && (
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          minWidth: 40,
          padding: '0 5px',
          borderRadius: 2,
          textAlign: 'center',
          color: colors.black.base,
          backgroundColor: colors.white
        }}
        className="font-lbl font-code"
      >
        {flag}
      </div>
    )}
    <div
      style={{
        position: 'absolute',
        top: 8,
        right: 8
      }}
      className="font-sm"
    >
      {label}
    </div>
    <div style={{ flex: 0 }} className="font-lbl font-code">
      {color}
    </div>
    <div style={{ flex: 1, textAlign: 'right' }}>
      <Flag small={1} light={1} pass={flags[0]} />
      <Flag small={0} light={1} pass={flags[1]} />
      <Flag small={1} light={0} pass={flags[2]} />
      <Flag small={0} light={0} pass={flags[3]} />
    </div>
  </div>
);
