import React, { useState, createContext } from "react";

type ContextProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const MenuContext = createContext<ContextProps>({
  menuOpen: false,
  setMenuOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MenuProvider = ({ children }: Props) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
