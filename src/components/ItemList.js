import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

export default function ItemList({ items, searchQuery, maxSuggestions }) {
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

    const backgroundImageUrl = '/bg.jpg'; // Update the path to your background image

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    fetch(backgroundImageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const imgData = URL.createObjectURL(blob);

        // Add the background image
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // Add text and other content on top of the background image
        doc.setFontSize(12);
        doc.text(`Item: ${item.name}`, 20, 20); // Replace with your PDF content
        doc.text(`Programme: ${item.programme}`, 20, 30); // Replace with your PDF content

        // Check if both position and grade are available before adding them to the PDF
        if (item.position && item.grade) {
          doc.text(`Position: ${item.position}`, 20, 40); // Replace with your PDF content
          doc.text(`Grade: ${item.grade}`, 65, 40); // Replace with your PDF content
        } else if (item.position) {
          doc.text(`Position: ${item.position}`, 20, 40); // Replace with your PDF content
        } else if (item.grade) {
          doc.text(`Grade: ${item.grade}`, 20, 40); // Replace with your PDF content
        }

        const pdfBlob = doc.output('blob');
        saveAs(pdfBlob, `${item.programme} - ${item.name}.pdf`);
      });
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center mb-9">{selectedItem.name}</h2>
            <div className="space-y-2">
              {items
                .filter((item) => item.name.includes(selectedItem.name))
                .map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-800 mr-2" />
                    <div>
                      <p className="text-gray-800 font-bold">{item.programme}</p>
                      {item.position && item.grade ? (
                        <p className="text-gray-800">
                           <span className="font-semibold  p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.position}</span> with{' '}
                          <span className="font-semibold  p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.grade}</span> grade
                        </p>
                      ) : (
                        <>
                          {item.position && (
                            <p className="text-gray-800">
                              Position: <span className="font-semibold  p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.position}</span>
                            </p>
                          )}
                          {item.grade && (
                            <p className="text-gray-800">
                              Grade: <span className="font-semibold  p-0.5 pl-2 pr-2 bg-slate-200 rounded-md">{item.grade}</span>
                            </p>
                          )}
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleDownloadPDF(item)}
                      className="px-4 py-2 bg-green-800 text-white rounded-md ml-auto hover:bg-green-700"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ul>
  );
}
