import Card from "@/components/Card";
import { getTreatments } from "@/lib/getTreatments";

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
              <Card key={item.id} data={item} />
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
