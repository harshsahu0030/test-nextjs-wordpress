import axios from "axios";

const page = async () => {
  const data = await axios.get(
    "https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/treatment",
  );

  console.log(data?.data);

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center flex-col gap-10">
      {data?.data?.map((item) => (
        <div key={item.id} className="p-4 border border-white rounded">
          <h2 className="text-xl font-bold mb-2">{item.title.rendered}</h2>
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: item.content.rendered }}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
