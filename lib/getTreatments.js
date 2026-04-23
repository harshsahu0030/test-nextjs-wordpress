export const revalidate = 60;

export async function getTreatments() {
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
