import type { Dispatch } from "react";

export function paginateItems<T>(
  items: T[],
  page: number,
  setItems: Dispatch<T[]>,
  itemsPerPage?: number
) {
  if (!itemsPerPage) itemsPerPage = 6;
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  setItems(items.slice(start, end));
}