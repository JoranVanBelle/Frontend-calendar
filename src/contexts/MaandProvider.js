import { createContext, useState } from "react";
import { useContext } from "react";

const MaandContext = createContext(0);
export const useMaand = () => useContext(MaandContext);

export const MaandProvider = ({ children }) => {
  const [maandIndex, setMaandIndex] = useState(new Date().getMonth());
  return (
    <MaandContext.Provider value={{ maandIndex, setMaandIndex }}>
      {children}
    </MaandContext.Provider>
  );
};
