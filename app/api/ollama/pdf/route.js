import { NextResponse } from 'next/server'

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 




export async function POST(req) {

  try {
      
      //get file path
      const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
      console.log("UPLOAD_DIR" + UPLOAD_DIR);
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
     
      const formData = await req.formData();
      const file = formData.get('file');
       
      const originalExtension = path.extname(file.name);
      console.log("Original extension: " + originalExtension);
      //ensures we get secure file path
      const uniqueFilename = uuidv4() + originalExtension;
      console.log("Unique File Name: " + uniqueFilename)


      const filePath = path.join(UPLOAD_DIR, uniqueFilename);
      console.log("File Path: " + filePath);

      //extract binary data
      const arrayBuffer = await file.arrayBuffer();
      //convert to node.js buffer
      const buffer = Buffer.from(arrayBuffer);
      //write buffer to path on disk to make it accessible for pdfloader
      fs.writeFileSync(filePath, buffer);
      console.log('File saved at:', filePath);

      const loader = new PDFLoader(filePath);
      const docs = await loader.load();
      // Print the number of document chunks loaded
      console.log("Loaded " + docs.length + "document chunks");

      // Print the content of the first chunk
      console.log("'\n'First 200 characters of the first chunk:'\n'" + docs[0].pageContent.slice(0, 200));

      // Print the metadata of the first chunk
      console.log("'\n'Metadata of the first chunk:'\n'" + JSON.stringify(docs[0].metadata, null, 2));

      const text = docs[0].pageContent;

      console.log("sUUccess")

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 100
      });

      const splitDocs = await textSplitter.splitDocuments(docs);

      console.log("Number of chunks: " + splitDocs.length);
      console.log("First Chunk: " + splitDocs[0].pageContent);
      
      return NextResponse.json({extractedText: text}, {status: 200});
  }
      
 
    catch (error) {
      console.log("failed");
      return NextResponse.json({ error: "Failed" }, { status: 500 });
      
    }

  }


 

    
  

