import { useState } from "react";

export function useFilter(dataList, callback) {
  const [query, setQuery] = useState("");
  const filterData = dataList.filter((data) => {
    return callback(data).toLowerCase().includes(query);
  });
  return [filterData, setQuery];
}
