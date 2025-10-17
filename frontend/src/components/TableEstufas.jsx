export default function TableEstufas({ estufas }) {
  return (
    <div className="w-[80%] bg-white rounded-xl shadow-lg overflow-hidden mt-10">
      <table className="w-full text-center border-collapse">
        <thead className="bg-slate-500 text-white">
          <tr>
            <th className="py-3">Nome</th>
            <th className="py-3">Temperatura</th>
            <th className="py-3">Umidade</th>
            <th className="py-3">Pressão</th>
          </tr>
        </thead>
        <tbody>
          {estufas.map((e) => (
            <tr
              key={e.id}
              className="hover:bg-slate-100 border-b border-gray-200"
            >
              <td className="py-3 font-semibold">{e.nome}</td>
              <td>{e.temperatura}</td>
              <td>{e.umidade}</td>
              <td>{e.pressao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
