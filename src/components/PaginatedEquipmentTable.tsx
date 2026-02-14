import { useLayoutEffect, useRef, useState } from "react";
import EquipmentTable, { type Equipment } from "./EquipmentTable";
import ReportFooter from "./ReportFooter";
import ReportHeader from "./ReportHeader";

interface PaginatedEquipmentTableProps {
  title: string;
  equipment: Equipment[];
}

const PaginatedEquipmentTable = ({
  title,
  equipment
}: PaginatedEquipmentTableProps) => {
  const [pages, setPages] = useState<Equipment[][]>([]);
  const measureRef = useRef<HTMLDivElement>(null);

  const computePages = () => {
    const container = measureRef.current;
    if (!container) return;

    const pageEl = container.querySelector<HTMLDivElement>("[data-measure-page]");
    const footerEl = container.querySelector<HTMLDivElement>("[data-measure-footer]");
    const tableEl = container.querySelector<HTMLTableElement>("table.equipment-table");
    const rowEls = container.querySelectorAll<HTMLTableRowElement>(
      "table.equipment-table tbody tr"
    );

    if (!pageEl || !footerEl || !tableEl || rowEls.length === 0) {
      setPages(equipment.length ? [equipment] : []);
      return;
    }

    const pageRect = pageEl.getBoundingClientRect();
    const footerRect = footerEl.getBoundingClientRect();
    const firstRowRect = rowEls[0].getBoundingClientRect();
    const rowStartTop = firstRowRect.top - pageRect.top;
    const availableHeight = pageRect.height - footerRect.height - rowStartTop;

    if (availableHeight <= 0) {
      setPages(equipment.length ? [equipment] : []);
      return;
    }

    const nextPages: Equipment[][] = [];
    let currentPage: Equipment[] = [];
    let currentHeight = 0;

    rowEls.forEach((rowEl, index) => {
      const rowHeight = rowEl.getBoundingClientRect().height;
      if (currentPage.length > 0 && currentHeight + rowHeight > availableHeight) {
        nextPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(equipment[index]);
      currentHeight += rowHeight;
    });

    if (currentPage.length > 0) {
      nextPages.push(currentPage);
    }

    setPages(nextPages.length ? nextPages : equipment.length ? [equipment] : []);
  };

  useLayoutEffect(() => {
    const frame = window.requestAnimationFrame(computePages);
    return () => window.cancelAnimationFrame(frame);
  }, [equipment, title]);

  useLayoutEffect(() => {
    const handleResize = () => computePages();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [equipment, title]);

  const pageItems = pages.length ? pages : equipment.length ? [equipment] : [];

  return (
    <>
      <div className="measure-layer" ref={measureRef} aria-hidden="true">
        <div className="report-page flex flex-col" data-measure-page>
          <div className="flex-1">
            <div data-measure-header>
              <ReportHeader />
            </div>
            <EquipmentTable title={title} equipment={equipment} />
          </div>
          <div data-measure-footer>
            <ReportFooter />
          </div>
        </div>
      </div>

      {pageItems.map((items, pageIndex) => (
        <div
          key={`all-equipment-page-${pageIndex}`}
          className="report-page print-break flex flex-col"
        >
          <div className="flex-1">
            <ReportHeader />
            <EquipmentTable title={title} equipment={items} />
          </div>
          <ReportFooter />
        </div>
      ))}
    </>
  );
};

export default PaginatedEquipmentTable;
