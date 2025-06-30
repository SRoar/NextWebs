'use client';
import { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
  // const [number, setNumber] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [response, setResponse] = useState("");  // ollama response
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const [state, setState] = useState("");

  // function incrementByOne() {
  //   setNumber(number + 1)
  // }

  // function decrementByOne() {
  //   setNumber(number - 1)
  // }
  

  const sendPrompt = async (kumarWisdom: string, moreWisdom: string) => {
    const res = await fetch('api/ollama/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({prompt: kumarWisdom + moreWisdom}),
    });

    const data = await res.json();
    setResponse(data.response);

    console.log("read the content")

  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]; // Get the first uploaded file
    if (!file) return; // If no file is selected, do nothing

    setFileName(file.name); // Store file name in state

    const reader = new FileReader(); // Create a new FileReader instance

    try {
        reader.onload = (event) => {
        if (!event.target) return;
        const content = event.target.result; // Get file content as text
        setFileContent(content as string);
        // setUserPrompt(content as string);
        console.log(content);
       }
       console.log("successfully read file")
       setState("Successfully Read File")
    }
    catch {
      console.log("failed")
      setState("Failed File Read")
    }

    reader.readAsText(file)
    
    // Handle different file types
    // if (file.type === "application/pdf") {
    //   // For PDF files, we'll need server-side processing
    //   const formData = new FormData();
    //   formData.append("file", file);
    // } else {
    // reader.readAsText(file)
    // }
    
  }

  function clear() {
    setFileName("")
    setState("")
    setFileContent("")
  }
  

  
  return (
    <div style={{ backgroundColor: "grey" }}>
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <a className="btn btn-primary" >
          <button type="button" >Special Number: {number}</button>
        </a>
        <a className="btn btn-primary" >
          <button type="button" onClick = {incrementByOne}>Add By One</button>
        </a>
        <a className="btn btn-primary" >
          <button type="button" onClick = {decrementByOne}>Subtract By One</button>
        </a> */}
        {/* <input
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />
        <a className="btn btn-primary" >
          <button type="button" onClick = {sendPrompt}>Send Prompt</button>
        </a>
        
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        Response: {response}
        </div> */}

        {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
        <input type = "file" onClick = {handleFileChange}/> */}

        <div className="mb-3" style={{ color: 'black', fontSize: 18 }}>
        <input type="file" onChange={handleFileChange} />
        <br>
        </br>
        <div>
          Current File: {fileName || ""}
          <button onClick={()=> clear()} className="btn btn-primary" >
            Clear File
          </button>
        </div>

        {state} 
        <br>
        </br>
        File Content: {fileContent}

        {/* <div>
          
          <button onClick={()=> sendPrompt(userPrompt, fileContent)} className="btn btn-primary" >
            Read both prompt and file
          </button>
        </div> */}
        

        
      </div>


        <div className="p-4">
        <textarea
          className="border p-2 w-full text-black"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Type your prompt..."
        />
        
        {/* <button onClick={()=> sendPrompt(userPrompt)} className="btn btn-primary" >
          Send
        </button> */}
        <button onClick={()=> sendPrompt(fileContent, userPrompt)} className="btn btn-primary" >
            Read both prompt and file
        </button>

        
          
          
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg> */}
        
        

        {/* <div className="mb-3">
          <input className="form-control" type="file" id="formFile" onChange={handleFileChange}/>
        </div> */}
          
         
        
        
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
           Response: {response}
        </div>
      </div>

        
        
        
        
        
      {/* </main> */}
      
    </div>
  );
}
