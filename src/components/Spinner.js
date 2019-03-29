import React from 'react';
import MDSpinner from 'react-md-spinner';

export default function Spinner(props) {
  return (
    <div className="spinner">
      <MDSpinner {...props} className="spinner__item" />
    </div>
  )
}