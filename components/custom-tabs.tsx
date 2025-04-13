import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface TabItem {
  status: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (status: string) => void;
  className?: string;
}

export function CustomTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabsProps) {
  return (
    <div className={cn("h-11.5 w-full border-b border-gray-200", className)}>
      <div className="flex overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.status}
            onClick={() => onTabChange(tab.status)}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 relative",
              activeTab === tab.status
                ? "text-primary border-b-2 border-primary font-semibold"
                : "text-muted-foreground hover:text-primary "
            )}
          >
            {tab.icon && <tab.icon className="mr-2 h-4 w-4" />}
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center"
              >
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
