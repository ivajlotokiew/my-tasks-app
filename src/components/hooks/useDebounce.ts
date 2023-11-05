import { useEffect, useState } from "react";

export const useDebounce = (value: string) => {
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceSearch(value), 150);

    return () => clearTimeout(timeout);
  }, [value]);

  return debounceSearch;
};
