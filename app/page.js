export const revalidate = 60;

async function getTreatments() {
  try {
    const res = await fetch(
      "https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/treatment",
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching treatments:", error);
    return [];
  }
}

export default async function Page() {
  const treatments = await getTreatments();

  return (
    <main className="min-h-screen w-full bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-10">
          Treatments
        </h1>

        {treatments.length > 0 ? (
          <div className="grid gap-6">
            {treatments.map((item) => (
              <article
                key={item.id}
                className="p-5 border border-white/20 rounded-xl"
              >
                <h2 className="text-xl font-semibold mb-3">
                  {item?.title?.rendered || "Untitled Treatment"}
                </h2>

                <div
                  className="text-sm leading-7"
                  dangerouslySetInnerHTML={{
                    __html: item?.content?.rendered || "",
                  }}
                />
              </article>
            ))}
          </div>
        ) : (
          <section className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Homeopathy Treatments for Chronic and Acute Conditions
            </h2>
            <p className="text-base leading-7 text-white/80">
              We provide treatment support for skin disorders, allergies,
              thyroid issues, migraine, diabetes, respiratory problems, female
              health concerns, digestive disorders, and other chronic
              conditions. Explore our treatment options and consult for
              personalized care.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
