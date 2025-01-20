import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PDFDownload = ({ sectionId, fileName }) => {
	const handleDownloadPDF = () => {
		const section = document.getElementById(sectionId);

        if (!section) {
            console.error('Element topilmadi!');
            return;
          }
          
		html2canvas(section, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/jpeg", 1);
			const pdf = new jsPDF("p", "mm", "a4");

			const pdfWidth = 210;
			const pdfHeight = 297;
			const imgWidth = pdfWidth;
			const imgHeight = (canvas.height * pdfWidth) / canvas.width;

			let heightLeft = imgHeight;
			let position = 0;

			pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
			heightLeft -= pdfHeight;

			while (heightLeft > 0) {
				position -= pdfHeight;
				pdf.addPage();
				pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
				heightLeft -= pdfHeight;
			}

			pdf.save(fileName);
		});
        
	};

	return (
		<button
			onClick={handleDownloadPDF}
			className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-500"
		>
			PDF файлни юклаш
		</button>
	);
};

export default PDFDownload;
