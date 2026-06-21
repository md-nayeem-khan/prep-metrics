"use client";

import * as React from "react";
import { Check, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const INCLUDED_ITEMS = [
  "All solved problems with difficulty and tags",
  "Full submission history and time tracking",
  "Complete mock interview session logs",
  "Pattern and topic performance breakdown",
];

function getFilenameFromDisposition(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;
  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);
  const plainMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (plainMatch?.[1]) return plainMatch[1];
  return null;
}

export function DataSection() {
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/export/txt");
      if (!response.ok) throw new Error("Failed to download analytics report");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const filename =
        getFilenameFromDisposition(response.headers.get("content-disposition")) ||
        `analytics-report-${new Date().toISOString().slice(0, 10)}.txt`;
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
      toast.success("Analytics report downloaded.");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Unable to download analytics report.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Analytics Report</CardTitle>
          <CardDescription>
            Download a complete report of your interview preparation data.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="rounded-lg border border-dashed bg-muted/30 p-4">
            <p className="mb-2.5 text-sm font-medium">What&apos;s included</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {INCLUDED_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Check className="size-3.5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Format: Plain text (.txt)</p>
            <Button onClick={handleDownload} disabled={isDownloading} className="gap-2">
              <Download className="size-4" />
              {isDownloading ? "Preparing…" : "Download Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
