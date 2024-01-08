import React, { createContext, useContext, useState } from "react";

type TabIndex = {
    index : number;
    setIndex : React.Dispatch<React.SetStateAction<number>>;
};

export const TabIndexContext = createContext<TabIndex>({} as TabIndex);

const IndexProvider : React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [index , setIndex] = useState(0);

  return (
    <TabIndexContext.Provider value={{ index, setIndex }}>
      {children}
    </TabIndexContext.Provider>
  );
};

export const useTabIndex = () => {
   return useContext(TabIndexContext);
}

export default IndexProvider;