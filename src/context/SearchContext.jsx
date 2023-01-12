import { useState, useEffect, createContext } from "react";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const value = { searchTerm, setSearchTerm };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
export default SearchContext;
