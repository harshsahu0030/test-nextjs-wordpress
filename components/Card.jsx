"use client";

import React from "react";

const Card = ({ data }) => {
  return (
    <div key={data.id} className="p-5 border border-white/20 rounded-xl">
      <h2 className="text-xl font-semibold mb-3">
        {data?.title?.rendered || "Untitled Treatment"}
      </h2>

      <div
        className="text-sm leading-7"
        dangerouslySetInnerHTML={{
          __html: data?.content?.rendered || "",
        }}
      />
    </div>
  );
};

export default Card;
