import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DosenCardSkeletonProps {
  count?: number;
}

export default function DosenCardSkeleton({
  count = 6,
}: DosenCardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden shadow-none p-4.5">
          <CardHeader className="flex flex-row justify-between space-y-0 p-0">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="grid gap-3">
              <div className="flex items-center">
                <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <div className="flex items-center">
                <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[180px]" />
              </div>
              <div className="flex items-center">
                <Skeleton className="mr-2 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[220px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
