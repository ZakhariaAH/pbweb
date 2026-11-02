import { createContext, useContext, useEffect, useState } from "react";

const KEY = "praktikum-favorites-v1";
const FavoritesContext = createContext(null);

function readIds() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return [];
    const value = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id) => Number.isInteger(id) && id > 0))];
  } catch {
    return [];
  }
}

function usePersistentFavorites() {
  const [ids, setIds] = useState(readIds);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
      setStorageError("");
    } catch {
      setStorageError("Favorit belum tersimpan di browser.");
    }
  }, [ids]);

  function toggle(id) {
    setIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );
  }
  function clearAll() {
    setIds([]);
  }
  return { ids, toggle, storageError, clearAll };
}

export function FavoritesProvider({ children }) {
  const value = usePersistentFavorites();
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (value === null) {
    throw new Error("useFavorites harus di dalam provider");
  }
  return value;
}
