import React from 'react';
import "./paginado.css"

function Paginado({ currentPage, total, handlePage }) {
  const pageNumbers = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="paginado">
      {/* Previous button */}
      <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1}>
        &lt; Previous
      </button>

      {/* Page numbers */}
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePage(pageNumber)}>
          {pageNumber}
        </button>
      ))}

      {/* Next button */}
      <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage >= total}>
        Next &gt;
      </button>
    </div>
  );
}

export default Paginado;