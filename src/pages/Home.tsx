//React
import { useState } from "react";

// UI


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

//Components
import { useFetch } from "@/hooks/useFetch";

const url = "http://localhost:3000/products";

const Home = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { data: items, deleteData, postData } = useFetch(url);

  const handleRemove = (id: number) => {
    deleteData(id);
  };
  return (
    <div>
      <div className=" align-center gap-5 shadow-xl h-12  flex items-center justify-start ">
        <h1 className="flex items-center justify-center font-bold m-5">
          Lista Produtos
        </h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="m-4 bg-green-500" type="button">Criar Produto</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Produto</DialogTitle>
          </DialogHeader>
          <DialogDescription>
        Preencha os campos abaixo para adicionar um novo produto.
      </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newProduct = { name, price: Number(price) };
              postData(newProduct);
              setName("");
              setPrice("");
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nome do Produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="number"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />

            <DialogFooter>
              {/* <Button type="submit" className="bg-red-500 hover:bg-red-700">Cancelar</Button> */}
              <Button type="submit" className="bg-green-500 hover:bg-green-700">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr className="border-b border-gray-500">
              <th className="px-6 py-3 border-r-2">ID</th>
              <th className="px-6 py-3 border-r-2">Nome</th>
              <th className="px-6 py-3 border-r-2">Preço</th>
              <th className="px-6 py-3 border-r-2 w-50 item-center justify-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.id} className="border-b ">
                  <td className="px-6 py-4">{item.id}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">R$ {item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 border-r-2 text-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => alert(`Editar ${item.name}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Deseja realmente deletar?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação é irreversível. Isso deletará
                            permanentemente o produto
                            <strong>{item.name}</strong>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemove(item.id!)}
                          >
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Home;
