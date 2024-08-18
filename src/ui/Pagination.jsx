import Button from "./Button";

function Pagination({ currentPage, totalPages, onPageChange, children }) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
      <div className="flex items-center gap-2">
        <Button
          variation="secondary"
          size="small"
          extraClasses="disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &larr;
        </Button>
        <Button
          variation="secondary"
          size="small"
          extraClasses="disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &rarr;
        </Button>

        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>
      {children}
    </div>
  );
}

export default Pagination;
