'use client';
import React from "react";
import Button from "./Button";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { usePagination } from "@/contexts/PaginationContext";

interface PaginationProps {
  maxVisiblePages?: number;
  showIcons?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  shape?: 'circle' | 'square' ;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  maxVisiblePages = 3,
  showIcons = true,
  size = 'sm',
  variant = 'ghost',
  shape = 'circle',
  className = ''
}) => {
  const { activePage, totalPage, setActive } = usePagination();
  
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    if (totalPage <= maxVisiblePages + 2) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const pages = [];
    const leftBoundary = 2;
    const rightBoundary = totalPage - 1;
    const leftEllipsis = activePage > leftBoundary + 2;
    const rightEllipsis = activePage < rightBoundary - 2;

    pages.push(1);

    if (leftEllipsis) {
      pages.push('...');
    } else {
      pages.push(2);
    }

    // Middle pages
    const start = Math.max(leftBoundary + 1, activePage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(rightBoundary - 1, activePage + Math.floor(maxVisiblePages / 2));
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (rightEllipsis) {
      pages.push('...');
    } else if (totalPage > 3) {
      pages.push(totalPage - 1);
    }

    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const isFirstPage = activePage === 1;
  const isLastPage = activePage === totalPage;

  return (
    <div className={`flex gap-1 ${className}`}>
      <Button
        size={size}
        variant={variant}
        shape={shape}
        onClick={() => !isFirstPage && setActive(activePage - 1)}
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        {showIcons ? <LuChevronLeft /> : "Prev"}
      </Button>

      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <Button 
            key={`ellipsis-${index}`} 
            size={size} 
            variant="ghost" 
            shape={shape}
            className="cursor-default"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            key={page}
            size={size}
            variant={page === activePage ? "primary" : variant}
            shape={shape}
            onClick={() => setActive(page as number)}
            className={page === activePage ? "btn-active" : ""}
            aria-current={page === activePage ? "page" : undefined}
          >
            {page}
          </Button>
        )
      ))}

      <Button
        size={size}
        variant={variant}
        shape={shape}
        onClick={() => !isLastPage && setActive(activePage + 1)}
        disabled={isLastPage}
        aria-label="Next page"
      >
        {showIcons ? <LuChevronRight /> : "Next"}
      </Button>
    </div>
  );
};

export default Pagination;