const Pagination = ({ currentPage, totalPages, onPageChange, maxVisibleItems }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startIndex = Math.max(0, currentPage - Math.floor(maxVisibleItems / 2));
  const endIndex = Math.min(startIndex + maxVisibleItems, totalPages);

  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  return (
    <nav className="nav__pagination">
      <div className="Pagination__container">
        <h2 className="Pagination__title">Pages Index</h2>
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="pagination__items">
              <a
                className="pagination__btn"
                href="#"
                onClick={() => onPageChange(currentPage - 1)}
              >
                ◀
              </a>
            </li>
          )}
          {visiblePageNumbers.map((page) => (
            <li
              key={page}
              className={`pagination__items ${currentPage === page ? "active-page" : ""}`}
            >
              <a
                className="pagination__btn"
                href="#"
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="pagination__items">
              <a
                className="pagination__btn"
                href="#"
                onClick={() => onPageChange(currentPage + 1)}
              >
                ▶
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;
