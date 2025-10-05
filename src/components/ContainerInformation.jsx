function ContainerInformation({ title, information }) {
  return (
    <div className="bg-white w-[35%] h-[40%] flex-col justify-center flex border items-center border-slate-500 outline-slate-300 rounded-md px-4 py-2 mx-4">
      <h2 className="text-slate-600 text-2xl font-extrabold mb-4 items-center">
        {title}
      </h2>
      <h2 className="text-slate-600 text-6xl mb-4 items-center">
        {information}
      </h2>
    </div>
  );
}

export default ContainerInformation;
