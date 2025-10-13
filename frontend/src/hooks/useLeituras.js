import { useState, useEffect } from "react";

export default function useLeituras() {
  const [leituras, setLeituras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeituras() {
      try {
        const response = await fetch("http://localhost:5000/leituras");
        const data = await response.json();
        setLeituras(data);
      } catch (error) {
        console.error("Erro ao buscar leituras:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeituras();
  }, []);

  return { leituras, loading };
}
