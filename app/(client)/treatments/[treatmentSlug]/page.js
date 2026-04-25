import { getSingleTreatment } from "@/lib/getTreatments";

export default async function page({ params }) {
  const resolvedParams = await params;

  const treatment = await getSingleTreatment({
    slug: resolvedParams?.treatmentSlug,
  });

  return (
    <div className="">
      <h1>{treatment[0]?.title?.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: treatment[0]?.content?.rendered || "",
        }}
      ></div>
    </div>
  );
}
