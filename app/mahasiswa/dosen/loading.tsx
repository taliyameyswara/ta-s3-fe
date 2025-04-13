import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <DosenCardSkeleton />
        <DosenCardSkeleton />
        <DosenCardSkeleton />
      </div>
    </div>
  );
}

function DosenCardSkeleton() {
  return (
    <div className="shadow-none hover:shadow transition-shadow duration-200 p-6 border rounded-lg">
      <div className="p-0">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div className="p-0 mt-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-40" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
}
