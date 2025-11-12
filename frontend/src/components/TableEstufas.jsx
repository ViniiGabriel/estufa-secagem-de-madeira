export default function TableEstufas({ estufas }) {
  if (!estufas || estufas.length === 0) {
    return (
      <div className="w-full flex justify-center mt-10">
        <p className="text-slate-500 text-lg">Nenhuma estufa cadastrada.</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] bg-white rounded-xl shadow-lg overflow-hidden mt-10 mb-10">
      <table className="w-full text-center border-collapse">
        <thead className="bg-slate-500 text-white">
          <tr>
            <th className="py-3">Nome</th>
            <th className="py-3">Temperatura</th>
            <th className="py-3">Umidade</th>
            <th className="py-3">Bateria</th>
          </tr>
        </thead>
        <tbody>
          {estufas.map((e) => (
            <tr
              key={e.id}
              className="hover:bg-slate-100 border-b border-gray-200 transition-colors duration-150"
            >
              <td className="py-3 font-semibold">{e.nome}</td>
              <td>{e.temperatura ?? "—"}</td>
              <td>{e.umidade ?? "—"}</td>
              <td>{e.bateria ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
