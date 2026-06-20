import * as React from "react";
import { Heading } from "@/components/ui/heading";

interface PageContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageHeaderAction?: React.ReactNode;
  scrollable?: boolean;
}

export function PageContainer({
  children,
  pageTitle,
  pageDescription,
  pageHeaderAction,
  scrollable = false,
}: PageContainerProps) {
  const hasHeader = pageTitle || pageHeaderAction;

  return (
    <div
      className={
        scrollable
          ? "flex flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4 overflow-auto"
          : "flex flex-1 flex-col px-4 pt-2 pb-4 md:px-6 md:pt-4"
      }
    >
      {hasHeader && (
        <div className="mb-4 flex items-start justify-between gap-4">
          {pageTitle && (
            <Heading title={pageTitle} description={pageDescription} />
          )}
          {pageHeaderAction && (
            <div className="shrink-0">{pageHeaderAction}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
