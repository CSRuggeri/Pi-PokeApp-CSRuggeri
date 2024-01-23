import React from 'react';
import "./paginado.css"

function Paginado({ currentPage, totalPages, handlePage, }) {

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i ++);

return (
  <div className="paginado">
{/* Previous button */}
<button onClick={() => handlePage(currentPage - 1)} disabled={currentPage <= 0}>
  &lt; Previous
</button>

    {/* Page numbers */}
    {pageNumbers.map((pageNumber) => (
      <button key={pageNumber} onClick={() => handlePage(pageNumber)}>
        {pageNumber +1}
      </button>
    ))}

  {/* Next button */}
{/* Next button */}
<button
  onClick={() => currentPage + 1 <= totalPages && handlePage(currentPage + 1)}
  disabled={currentPage  >= totalPages}
>
  Next &gt;
</button>
  </div>
);
}

export default Paginado;