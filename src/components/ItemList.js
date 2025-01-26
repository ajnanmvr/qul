import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import { useState } from 'react';

export default function ItemList({ items, searchQuery, maxSuggestions }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);

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
    
    // Load Montserrat font
    doc.addFont('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhzg.ttf', 'Montserrat', 'normal');
    
    const backgroundImageUrl = '/certificate.jpg'; // Update the path to your background image
    
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    
    fetch(backgroundImageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const imgData = URL.createObjectURL(blob);
  
        // Add the background image
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  
        // Set the font to Montserrat
        doc.setFont('Montserrat');
  
        // Add text and other content on top of the background image
        doc.setFontSize(15);
        doc.setTextColor(0, 0, 0); // Set text color to black
        
        const capitalizedName = item.name.toUpperCase();
        const capitalizedGrade = item.grade ? item.grade.toUpperCase() : '';
        const capitalizedPosition = item.position ? item.position.toUpperCase() : '';
        const capitalizedProgramme = item.programme.toUpperCase();
        
        doc.text(`This is to certify that Mr. ${capitalizedName} has been awarded`, pdfWidth / 2, 135, { align: 'center' });
        
        if (item.position && item.grade) {
          doc.text(`the ${capitalizedPosition} position with ${capitalizedGrade} grade in ${capitalizedProgramme} in KAFAN'24`, pdfWidth / 2, 144, { align: 'center' });
        } else if (item.position) {
          doc.text(`the ${capitalizedPosition} position without any grade in ${capitalizedProgramme} in KAFAN'24`, pdfWidth / 2, 144, { align: 'center' });
        } else if (item.grade) {
          doc.text(`${capitalizedGrade} grade without any position in ${capitalizedProgramme} in KAFAN'24`, pdfWidth / 2, 144, { align: 'center' });
        }
  
        doc.text(`DHIU PG Arts Fest organized by Darul Huda Students' Union (DSU)`, pdfWidth / 2, 153, { align: 'center' });
        doc.text(`on October 01 to 06, 2024 at Darul Huda Islamic University`, pdfWidth / 2, 162, { align: 'center' });
  
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

  const handleShowAllSuggestions = () => {
    setShowAllSuggestions(true);
  };

  return (
    <ul className='flex justify-center mt-4 flex-wrap'>
      {(showAllSuggestions
        ? filteredItems
        : filteredItems.slice(0, maxSuggestions)
      ).map((item) => (
        <li
          key={item.name}
          className="cursor-pointer hover:bg-red-900  py-2 px-4 bg-red-800 font-semibold text-white rounded-full m-1"
          onClick={() => handleItemClick(item)}
        >
          <h2>{item.name}</h2>
        </li>
      ))}
<br/>
      {!showAllSuggestions && (
        <li>
          <button
            className="cursor-pointer hover:bg-red-700 hover:text-white py-2 px-4 bg-yellow-500 font-semibold text-black rounded-full m-1"
            onClick={handleShowAllSuggestions}
          >
            Show All Suggestions
          </button>
        </li>
      )}
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-100 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full  border-red-800">
            <h2 className="text-2xl font-bold text-center mb-9">{selectedItem.name}</h2>
            <div className="space-y-2">
              {items
                .filter((item) => item.name.includes(selectedItem.name))
                .map((item) => (
                  <div key={item.id} className="flex items-center pt-3">
                    <div className="w-4 h-4 rounded-full bg-red-800 text-black mr-2" />
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
                      className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md ml-auto  hover:bg-yellow-600 hover:text-black"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-4 flex-col">
              <p className="text-zinc-500 text-sm text-center m-5">Designed and Developed by <br/>
               <span className="font-semibold text-lg">DSU Media Wing 2024-'25</span></p>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-800 text-white font-bold rounded-md hover:bg-red-900"
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