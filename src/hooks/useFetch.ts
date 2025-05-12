import { useState, useEffect } from "react";

export type Product = {
    id?: number,
    name: string,
    price: number
  };

export const useFetch = (url: string) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading]= useState(false)
  // const [itemId, setItemId] = useState<number | null>(null);

  const fetchData = async () => {
   setLoading(true);
    const res = await fetch(url);
    try {
      if (!res.ok) {
        throw new Error("Erro ao buscar produtos")
      }
      const json = await res.json();
      setData(json)
    } catch(error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  };

  const postData = async (product:Product) => {
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "applicaton/json"},
        body: JSON.stringify(product)
      })
      return res.json()
    } catch(error){ 
      console.log(error)
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, postData, refetch: fetchData };
};