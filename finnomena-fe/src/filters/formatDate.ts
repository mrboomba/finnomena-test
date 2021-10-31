import { format } from "date-fns";

export function displayDate(date: Date) {
    return format(new Date(date), "dd MMM yyyy");
}