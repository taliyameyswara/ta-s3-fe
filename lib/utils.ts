import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "d MMMM yyyy", { locale: id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return dateString;
  }
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "secondary";
    case "diterima":
      return "success";
    case "ditolak":
      return "destructiveOutline";
    case "direvisi":
      return "primary";
    default:
      return "outline";
  }
};
