import { useState, useEffect } from "react";
import { toast } from "sonner";

export type Product = {
    id?: number,
    name: string,
    price: number
  };


export const useFetch = (url: string) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading]= useState(false);
  
  const fetchData = async () => {
  setLoading(true);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    const json = await res.json();
    setData(json);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  const postData = async (product: Product) => {
    setLoading(true)
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
      });

      const newProduct = await res.json();
      setData((prevData) => (prevData ? [...prevData, newProduct] : [newProduct]));	

    } catch(error){ 

      console.log(error)
    }
    setLoading(false)
  };
  
  const deleteData = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar produto");
      } 

      setData((prevData) => prevData?.filter((item) => item.id !== id) || null);

      toast.success("Produto deletado com sucesso");

    } catch (error: any) {
      setError(error.message);
      toast.error("Erro ao deletar produto");

    } finally {
      setLoading(false);
    };
    
    
  }
  useEffect(() => {
    if (url) {
      fetchData();
    } else {
      console.error("URL não fornecida");
    }
  }, [url]);
return { data, loading, error, postData, refetch: fetchData, deleteData };
};