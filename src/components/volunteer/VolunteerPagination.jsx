const VolunteerPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
  );

  return (
    <div className="volunteer-pagination">
      <button
        type="button"
        className="volunteer-page-button nav"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        이전
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={`volunteer-page-button ${page === pageNumber ? "active" : ""}`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        className="volunteer-page-button nav"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default VolunteerPagination;
