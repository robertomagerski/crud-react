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

const produtos = [
  { id: 1, nome: "Camiseta", preco: 49.9 },
  { id: 2, nome: "Calça Jeans", preco: 89.9 },
  { id: 3, nome: "Tênis", preco: 129.9 },
];

// const url = "http://localhost:3000/products"

const Home = () => {
  return (
    <div>
      <div className="flex justify-start align-center gap-5 shadow-xl h-12   ">
        <DropdownMenu>
          <DropdownMenuTrigger>
          <button className="p-2 rounded-md hover:bg-muted">
          <Menu className="w-5 h-5" />
        </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link to={"/criarproduto"}>Criar Produto</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={"/deletarproduto"}>Deletar Produto</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <h1 className="flex items-center justify-center font-bold">Produtos</h1>
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
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-t">
              <td className="px-6 py-4">{produto.id}</td>
              <td className="px-6 py-4">{produto.nome}</td>
              <td className="px-6 py-4">R$ {produto.preco.toFixed(2)}</td>
              <td className="px-6 py-4 text-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => alert(`Editar ${produto.nome}`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => alert(`Deletar ${produto.nome}`)}
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
