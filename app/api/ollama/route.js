import { NextResponse } from 'next/server'
 
export async function POST(req) {
try {
    const { prompt } = await req.json();
    const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      
    },

    body: JSON.stringify({ model: 'llama3',
        prompt,
        stream: false,
      }),
  })
 
  const data = await res.json()
 
  return NextResponse.json(data)
}
  
  catch (error) {
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

