import { NextResponse } from 'next/server'

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// import pdfParse from 'pdf-parse'; source of error



export async function POST(req) {

  try {
   

    const formData = await req.formData();
    const file = formData.get('file');
    

      console.log("Filename: "  + file.name) // "C:\Users\hishi\Downloads\W24 Final Exam Solutions Packet KEY .pdf"
     

      //await writeFile(tempPath, buffer); // Save the file to a temporary path

      // Load PDF with LangChain
      let path = "C:\\Users\\hishi\\Downloads\\" + file.name
      console.log(path);
      const loader = new PDFLoader(path);
      const docs = await loader.load();
      // Print the number of document chunks loaded
      console.log("Loaded " + docs.length + "document chunks");

      // Print the content of the first chunk
      console.log("'\n'First 200 characters of the first chunk:'\n'" + docs[0].pageContent.slice(0, 200));

      // Print the metadata of the first chunk
      console.log("'\n'Metadata of the first chunk:'\n'" + JSON.stringify(docs[0].metadata, null, 2));

      const text = docs[0].pageContent;

      console.log("sUUccess")
      
      return NextResponse.json({extractedText: text}, {status: 200});
  }
      
 
    catch (error) {
      console.log("failed");
      return NextResponse.json({ error: "Failed" }, { status: 500 });
      
    }

  }


 

    
  

