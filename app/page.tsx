'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  const [number, setNumber] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [response, setResponse] = useState("");  // ollama response

  function incrementByOne() {
    setNumber(number + 1)
  }

  function decrementByOne() {
    setNumber(number - 1)
  }
  

  const sendPrompt = async () => {
    const res = await fetch('/api/ollama/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({prompt: firstName}),
    });

    const data = await res.json();
    setResponse(data.response);

  };

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <a className="btn btn-primary" >
          <button type="button" >Special Number: {number}</button>
        </a>
        <a className="btn btn-primary" >
          <button type="button" onClick = {incrementByOne}>Add By One</button>
        </a>
        <a className="btn btn-primary" >
          <button type="button" onClick = {decrementByOne}>Subtract By One</button>
        </a>
        <input
          value={firstName} 
          onChange={e => setFirstName(e.target.value)} 
        />
        <a className="btn btn-primary" >
          <button type="button" onClick = {sendPrompt}>Send Prompt</button>
        </a>
         <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        Response: {response}
      </div>

        
        
        
        
        
      </main>
      
    </div>
  );
}
