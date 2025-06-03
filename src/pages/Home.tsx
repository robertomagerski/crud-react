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
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NumericFormat } from "react-number-format";

//Components
import { useFetch } from "@/hooks/useFetch";

const url = "http://localhost:3000/products";

const Home = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  const { data: items, deleteData, postData } = useFetch(url);

  const handleRemove = (id: number, e?: React.MouseEvent) => {
    deleteData(id);
    e?.preventDefault();
  };

  const newProduct = { name, price: Number(price) };

  const clearSubmit = () => {
    setName("");
    setPrice(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div>
      <div className=" align-center gap-5 shadow-xl h-12  flex items-center justify-start ">
        <h1 className="flex items-center justify-center font-bold m-5">
          Lista de Produtos
        </h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="m-4 bg-green-500"
            type="button"
            onClick={() => clearSubmit()}
          >
            Criar Produto
          </Button>
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
              postData(newProduct);
              setName("");
              setPrice(0);
            }}
            className="space-y-4 relative w-full"
          >
            <input
              type="text"
              placeholder="Nome do Produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              placeholder="R$"
              value={price}
              onValueChange={(values) => {
                setPrice(values.floatValue || 0);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />

            <DialogFooter>
              {/* <Button type="submit" className="bg-red-500 hover:bg-red-700">Cancelar</Button> */}
              <Button type="submit" className="bg-green-500 hover:bg-green-700">
                Criar
              </Button>
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
                  <td className="px-6 py-4">{formatCurrency(item.price)}</td>
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
                            className="bg-red-500 hover:bg-red-700"
                            onClick={() => handleRemove(item.id!)}
                            type="button"
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
