export async function FetchLotes() {
  try {
    const response = await fetch("http://localhost:5000/api/lotes");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar lotes:", error);
    return [];
  }
}
