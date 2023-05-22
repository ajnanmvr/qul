import { saveAs } from 'file-saver';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

export default function ItemList  ({ items, searchQuery, maxSuggestions }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const uniqueItems = new Set();
  const filteredItems = [];

  items.forEach((item) => {
    if (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !uniqueItems.has(item.name)
    ) {
      uniqueItems.add(item.name);
      filteredItems.push(item);
    }
  });
  const handleDownloadPDF = (item) => {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const backgroundImageUrl = '../../public/bg.jpg';
    // Set background image
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.addImage(backgroundImageUrl, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Add text and other content on top of the background image
    doc.setFontSize(12);
    doc.text(`Item: ${item.name}`, 20, 20); // Replace with your PDF content
    doc.text(`Programme: ${item.programme}`, 20, 30); // Replace with your PDF content
    doc.text(`Position: ${item.position}`, 20, 40); // Replace with your PDF content
    doc.text(`Grade: ${item.grade}`, 20, 50); // Replace with your PDF content

    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `${item.programme} - ${item.name}.pdf`);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

return (
    <ul>
      {filteredItems.slice(0, maxSuggestions).map((item) => (
        <li
          key={item.name}
          className="cursor-pointer hover:bg-gray-200 py-2 px-4"
          onClick={() => handleItemClick(item)}
        >
          <h2>{item.name}</h2>
        </li>
      ))}

      {selectedItem && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedItem.name}</h2>
            {items
              .filter((item) => item.name.includes(selectedItem.name))
              .map((item) => (
                <div key={item.id}>
                  <p>{item.programme}</p>
                  <p>{item.position + item.grade}</p>
                  <button onClick={() => handleDownloadPDF(item)}>Download PDF</button>
                </div>
              ))}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </ul>
  );
}