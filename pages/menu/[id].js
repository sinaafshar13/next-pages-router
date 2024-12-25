import { useRouter } from "next/router";
import React from "react";

const Details = ({ data }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>Details</div>;
};

export default Details;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/data");
  const json = await res.json();
  const data = json.slice(0, 10);
  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));
  console.log(paths);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  const res = await fetch(`http://localhost:5000/data/${id}`);
  const data = await res.json();
  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
    revalidate: 10,
  };
}