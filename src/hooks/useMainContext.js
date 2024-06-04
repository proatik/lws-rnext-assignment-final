import { useContext } from "react";

// main context.
import { MainContext } from "@/contexts/MainContext";

const useMainContext = () => {
  return useContext(MainContext);
};

export default useMainContext;
