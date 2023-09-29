import React, { useRef } from 'react';
import InputComponent, { ButtonComponent } from '~/components/testForm';

const Test = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div>
      <InputComponent type="password" label="KAZKAS" className="bg-red-800 py-0" ref={ref} />
      <button onClick={() => alert(ref?.current?.value)}>Submit</button>
      <ButtonComponent big />
    </div>
  );
};

export default Test;
