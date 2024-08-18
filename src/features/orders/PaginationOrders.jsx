import Button from "@/ui/Button";
import { PAGE_SIZE } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

function PaginationOrders({ count, children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
      <div className="flex items-center gap-2">
        <Button
          variation="secondary"
          size="small"
          extraClasses="disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          &larr;
        </Button>
        <Button
          variation="secondary"
          size="small"
          extraClasses="disabled:cursor-not-allowed disabled:bg-gray-200"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          &rarr;
        </Button>

        <span>
          Página {currentPage} de {pageCount}
        </span>
      </div>
      {children}
    </div>
  );
}

export default PaginationOrders;
