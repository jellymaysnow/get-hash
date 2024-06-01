"use client"

import { useState } from 'react';
import { useEffect } from 'react';

function Title({ hashing }) {
  return (
    <h1 className="text-5xl text-center">GET { hashing } NOW...</h1>
  )
}

function Form({ hashing }) {
  const [text, setText] = useState("");
  const [state, setState] = useState('');
  useEffect(() => {
    const hash = async () => {
      const encoder = new TextEncoder();
      const msgUint8 = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest( hashing , msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setState(hashHex);
    }
    hash();
  });

  return (
    <>
      <form className="text-center">
        <textarea cols={60} rows={3} className="border-2 rounded border-gray-300 p-2"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </form>
      <div className="mockup-code">
        <pre data-prefix="$" className='text-center m-4' ><code>&gt; {state}</code></pre>
      </div>
    </>
  );
}

function Select() {
  return (
    <>
    </>
  );
}

const hashMethods = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
let hashing = hashMethods[1];

// Main
export default function Home() {
  return (
    <div className="w-screen h-screen text-gray-50">
      <div className="p-20">
        <Title param={ hashing }/>
        <div className="m-8">
          <Form hashing={ hashing }/>
        </div>
      </div>
    </div>
  );
}