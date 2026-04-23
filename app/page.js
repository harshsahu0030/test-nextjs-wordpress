export async function getTreatments() {
  try {
    const res = await fetch(
      "https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/treatment",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) throw new Error("API failed");

    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

const page = async () => {
  const treatments = await getTreatments();
  console.log(treatments);

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center flex-col gap-10">
      <h1 className="text-center text-5xl">Treatments</h1>
      {treatments?.map((item) => (
        <div key={item.id} className="p-4 border border-white rounded">
          <h2 className="text-base font-bold mb-2">{item.title.rendered}</h2>
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
