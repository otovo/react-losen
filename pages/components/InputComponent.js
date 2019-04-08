// @flow
import React, { useState } from 'react';

const InputComponent = () => {
  const [text, setText] = useState('');
  console.log('InputComponent says hi');
  return <textarea value={text} onChange={ev => setText(ev.target.value)} />;
};

export default InputComponent;
