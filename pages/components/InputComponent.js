// @flow
import React, { useState } from 'react';

type Props = {
  name: string,
};

const InputComponent = ({ name }: Props) => {
  const [text, setText] = useState('');
  return (
    <textarea
      className="w-100 h3"
      placeholder={name}
      value={text}
      onChange={ev => setText(ev.target.value)}
    />
  );
};

export default InputComponent;
