export async function getBlog() {
  try {
    const res = await fetch(
      "https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/posts",
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching blog:", error);
    return [];
  }
}

export async function getSingleBlog({ slug }) {
  try {
    const res = await fetch(
      `https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/posts?slug=${slug}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching blog:", error);
    return [];
  }
}

export async function getBlogByCategory({ slug }) {
  try {
    const res = await fetch(
      `https://content.healinghubhomoeopathicclinic.com/wp-json/wp/v2/categories?slug=${slug}`,
      {
        method: "GET",
      },
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching blog by category:", error);
    return [];
  }
}
