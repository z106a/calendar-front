import React from 'react';
import Spinner from './Spinner';

export default function SubmitButton({onSubmit, isLoading, label='Установить'}) {
  return (
    <button className="submit" onClick={onSubmit}>
        {isLoading ? <Spinner size={20} /> : label}
    </button>
  )
}