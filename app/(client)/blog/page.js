import { getBlog } from "@/lib/getBlog";

const page = async () => {
  const blog = await getBlog();

  return (
    <div>
      {blog?.map((item) => (
        <div key={item.id}>
          <h2>{item?.title.rendered}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: item?.content.rendered || "",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default page;
