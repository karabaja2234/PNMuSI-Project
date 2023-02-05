import jsPDF from 'jspdf'
import 'jspdf-autotable';
import logo from '../assets/images/logo-ptf.jpg'

//Method that creates a PDF report about a specific calculation
export const exportToPdf = (results, method, functionDefinition, maxIterations, precision, lowerLimit, upperLimit) => {
    var doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    //Logo
    doc.addImage(logo, 'JPEG', 10, 10, 65, 65);

    //Description
    const pdfMethod = "Metoda: " + method
    const pdfFunctionDefinition = "Funkcija: " + functionDefinition
    const pdfMaxIterations = "Max. iteracija: " + maxIterations
    const pdfPrecision = "Preciznost: " + precision
    const pdfLowerLimit = lowerLimit !== null ? "Donja granica: " + lowerLimit : "Donja granica: /"
    const pdfUpperLimit = upperLimit !== null ? "Gornja granica: " + upperLimit : "Gornja granica: /"
    const pdfDateOfExport = "Datum: " + new Date().toDateString();

    //Title (topic)
    doc.setFontSize(18);
    doc.setFont("helvetica-Bold");
    const title = "Numericko rjesavanje nelinearnih jednacina"
    doc.text(title, pageWidth - doc.getTextWidth(title) - 10, 20);

    //Description
    doc.setFontSize(12);
    doc.setFont("helvetica");
    doc.text(pdfMethod, pageWidth - doc.getTextWidth(pdfMethod) - 10, 40);
    doc.text(pdfFunctionDefinition, pageWidth - doc.getTextWidth(pdfFunctionDefinition) - 10, 50);
    doc.text(pdfMaxIterations, pageWidth - doc.getTextWidth(pdfMaxIterations) - 10, 60);
    doc.text(pdfPrecision, pageWidth - doc.getTextWidth(pdfPrecision) - 10, 70);
    doc.text(pdfLowerLimit, pageWidth - doc.getTextWidth(pdfLowerLimit) - 10, 80);
    doc.text(pdfUpperLimit, pageWidth - doc.getTextWidth(pdfUpperLimit) - 10, 90);
    doc.text(pdfDateOfExport, 15, 90);

    //Table of results
    const columns = ["Iteracija", "Aproksimacija", "Apsolutna greška"];
    const rows = results.map((result, index) => [index + 1, result.approximation, result.mistake]);
    doc.autoTable({
        head: [columns],
        body: rows,
        startY: 110,
        theme: 'striped',
        font: "helvetica"
    });

    //Download the pdf
    doc.save(method + "-" + new Date().getTime() + ".pdf");
};