import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  return (
    <div style={{ height: "600px", border: "1px solid #ccc" }}>
      <Viewer fileUrl={fileUrl} />
    </div>
  );
};

export default PDFViewer;
