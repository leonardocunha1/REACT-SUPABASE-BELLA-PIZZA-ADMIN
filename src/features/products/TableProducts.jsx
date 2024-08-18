import React, { useState } from "react";

import useProducts from "./useProducts";
import useFilteredProducts from "./useFilteredProducts";
import useDeleteProduct from "./useDeleteProduct";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { formatCurrency } from "@/utils/helpers";

import { HiOutlineDotsVertical } from "react-icons/hi";

import Loader from "@/ui/Loader";
import Modal from "@/ui/Modal";
import CreatEditFormProducts from "./CreateEditFormProducts";
import Pagination from "@/ui/Pagination";
import Button from "@/ui/Button";
import ConfirmDelete from "@/ui/ConfirmDelete";

function TableProducts({ currentPage, setCurrentPage }) {
  const { products = [], isPending } = useProducts();
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const produtosOrdenados = useFilteredProducts(products);

  //   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(produtosOrdenados.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = produtosOrdenados.slice(startIndex, endIndex);

  if (isPending) return <Loader isLoading={isPending} />;

  return (
    <Modal>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-52">Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Disponibilidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* //! se o modal tivesse dentro do map, ou seja, da estrutura de repetição, não seria necessário colocar o id do produto no nome do modal, pois cada modal seria único (montando individualmente) */}
            {currentItems.map((produto) => (
              <React.Fragment key={produto.id}>
                <TableRow className="duration-200 hover:bg-orange-300 hover:bg-opacity-10">
                  <TableCell>
                    <img
                      src={produto.image_url}
                      alt={produto.name}
                      className="h-[45px] w-10 min-w-[50px] rounded-full object-contain"
                    />
                  </TableCell>
                  <TableCell className="font-semibold tracking-wide">
                    {produto.name}
                  </TableCell>
                  <TableCell>{produto.description}</TableCell>
                  <TableCell>{produto.category}</TableCell>
                  <TableCell>{formatCurrency(produto.price)}</TableCell>
                  <TableCell>
                    {produto.availability === false ? (
                      <p className="rounded-full bg-red-200 text-center text-[11px] font-bold uppercase text-red-600">
                        Indisponível
                      </p>
                    ) : (
                      <p className="rounded-full bg-green-200 text-center text-[11px] font-bold uppercase text-green-600">
                        Disponível
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="rounded-md bg-stone-200 p-2">
                        <HiOutlineDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Infos</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Modal.Open opens={`editar-${produto.id}`}>
                            <button>Editar</button>
                          </Modal.Open>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Modal.Open opens={`deletar-${produto.id}`}>
                            <button>Deletar</button>
                          </Modal.Open>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

                <Modal.Window name={`editar-${produto.id}`}>
                  <CreatEditFormProducts editProduct={produto} />
                </Modal.Window>
                <Modal.Window name={`deletar-${produto.id}`}>
                  <ConfirmDelete
                    resourceName={produto.name}
                    onConfirm={() =>
                      deleteProduct({
                        idProduto: produto.id,
                        urlImg: produto.image_url,
                      })
                    }
                    disabled={isDeleting}
                  />
                </Modal.Window>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        >
          <Modal.Open opens="add">
            <Button size="large">Adicionar produto</Button>
          </Modal.Open>
        </Pagination>
      </div>

      <Modal.Window name="add">
        <CreatEditFormProducts />
      </Modal.Window>
    </Modal>
  );
}

export default TableProducts;
