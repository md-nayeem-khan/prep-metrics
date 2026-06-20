import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardMainCardSkeletonProps {
  rows?: number;
  centerRows?: boolean;
}

export function DashboardMainCardSkeleton({
  rows = 3,
  centerRows = false,
}: DashboardMainCardSkeletonProps) {
  return (
    <Card className="h-full min-h-[400px] border-2 border-border/60 bg-background/80 backdrop-blur-sm overflow-hidden relative">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={centerRows ? "flex-1 flex flex-col justify-center gap-3" : "space-y-4"}
      >
        {Array.from({ length: rows }).map((_, idx) => (
          <Skeleton key={idx} className="h-16 w-full rounded-xl" />
        ))}
      </CardContent>
    </Card>
  );
}

export function DashboardHeaderStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="border-2 border-border/60 bg-background/80 backdrop-blur-sm overflow-hidden relative">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <Skeleton className="h-12 w-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}