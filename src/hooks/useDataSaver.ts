import { useEffect, useState } from "react";

type ConnectionWithSaveData = Navigator["connection"] & {
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
  saveData?: boolean;
};

function getConnection() {
  if (typeof navigator === "undefined") return null;
  return navigator.connection as ConnectionWithSaveData | null;
}

export function useDataSaver() {
  const [saveData, setSaveData] = useState(() => getConnection()?.saveData ?? false);

  useEffect(() => {
    const connection = getConnection();
    if (!connection?.addEventListener) return;

    const sync = () => setSaveData(connection.saveData ?? false);
    sync();
    connection.addEventListener("change", sync);

    return () => connection.removeEventListener?.("change", sync);
  }, []);

  return saveData;
}
