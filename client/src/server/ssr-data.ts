import fetch from "node-fetch";

export const ssrDataFuncs = {
  "/detail/:id": async ({ id }: { id: string }) => {
    const response = await fetch(`/api/details/${id}`);
    const data = await response.json();
    return data;
  },
};
