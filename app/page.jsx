'use client'

import styles from './style.module.sass'
import { useState } from 'react';
import { useEffect } from 'react';

const hashMethods = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];

// if hash method is sha-1, font color will be red
let strengthColor;
function methodNameColor(hashing) {
  if (hashing !== hashMethods[0]) {
    strengthColor = styles.strong;
  } else {
    strengthColor = styles.week;
  }
}

/***** Components *****/
function Hash({ hashing }) {
  const [text, setText] = useState('');
  const [state, setState] = useState('');
  useEffect(() => {
    const hash = async () => {
      const encoder = new TextEncoder();
      const msgUint8 = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(hashing, msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setState(hashHex);
    }
    hash();
  });
  return (
    <>
      <textarea cols={60} rows={3} className='border-2 rounded border-gray-300 p-2'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className={styles.hash}>
        <legend className={strengthColor}>{hashing}</legend>
        <p>&gt; {state}</p>
      </div>
    </>
  );
}

function SelectMthods() {
  const [val, setVal] = useState('1');
  methodNameColor(hashMethods[parseInt(val)]);
  function handleChangeOption(event) {
    setVal(event.target.value);
  }
  return (
    <>
      <Hash hashing={hashMethods[val]} />
      <div className='m-8'>
        <label className='m-8'>{hashMethods[0]}<input type='radio' name='method' className='radio radio-accent' value='0'
          checked={val === '0'} onChange={handleChangeOption} /></label>
        <label className='m-8'>{hashMethods[1]}<input type='radio' name='method' className='radio radio-accent' value='1'
          checked={val === '1'} onChange={handleChangeOption} /></label>
        <label className='m-8'>{hashMethods[2]}<input type='radio' name='method' className='radio radio-accent' value='2'
          checked={val === '2'} onChange={handleChangeOption} /></label>
        <label className='m-8'>{hashMethods[3]}<input type='radio' name='method' className='radio radio-accent' value='3'
          checked={val === '3'} onChange={handleChangeOption} /></label>
      </div>
    </>
  );

}


/*************************************************************************************************************************************/

// Main
export default function Home() {
  return (
    <div className='w-screen h-screen text-gray-50'>
      <div className='p-20'>
        <h1 className='text-5xl text-center'>GET HASH NOW...</h1>
        <div className='m-8 text-center'>
          <SelectMthods />
        </div>
      </div>
    </div>
  );
}