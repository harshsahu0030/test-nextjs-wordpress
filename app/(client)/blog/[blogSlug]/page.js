import { getSingleBlog } from "@/lib/getBlog";

export default async function pagex({ params }) {
  const resolvedParams = await params;

  const blog = await getSingleBlog({
    slug: resolvedParams?.blogSlug,
  });

  console.log(blog);

  return (
    <div className="">
      <h1>{blog[0]?.title?.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: blog[0]?.content?.rendered || "",
        }}
      ></div>
    </div>
  );
}
