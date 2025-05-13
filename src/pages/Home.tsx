// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

const url = "http://localhost:3000/products";

const Home = () => {



  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState<number | "">("");

  const { data: items, postData, deleteData, loading, error } = useFetch(url);

  const handleRemove = (id: number) => {
    deleteData(id);
    alert(`Produto ${id} deletado com sucesso`);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newProduct: Product = {
  //     name,
  //     price: Number(price),
  //   };
  //   postData(newProduct);
  // };

  return (
    <div>
      <div className=" align-center gap-5 shadow-xl h-12  flex items-center justify-start ">
        <DropdownMenu>
          <DropdownMenuTrigger>
              <Menu className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/criarproduto"}>Criar Produto</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="flex items-center justify-center font-bold">
          {" "}
          Lista Produtos
        </h1>
      </div>

      <div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Preço</th>
              <th className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">R$ {item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => alert(`Editar ${item.name}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (item.id !== undefined) {
                          handleRemove(item.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
