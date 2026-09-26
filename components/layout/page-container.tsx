import * as React from "react";
import { Heading } from "@/components/ui/heading";

interface PageContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageHeaderAction?: React.ReactNode;
  importAction?: React.ReactNode;
}

export function PageContainer({
  children,
  pageTitle,
  pageDescription,
  pageHeaderAction,
  importAction,
}: PageContainerProps) {
  const hasHeader = pageTitle || pageHeaderAction || importAction;

  return (
    <div className="flex flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4">
      {hasHeader && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          {pageTitle && (
            <Heading title={pageTitle} description={pageDescription} />
          )}
          {(pageHeaderAction || importAction) && (
            <div className="flex shrink-0 flex-wrap justify-end gap-2">{importAction}{pageHeaderAction}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
