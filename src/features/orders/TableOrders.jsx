import useOrders from "./useOrders";

import React from "react";

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

import Loader from "@/ui/Loader";
import PaginationOrders from "./PaginationOrders";
import StatusOrders from "./StatusOrders";
import PaymentMethod from "./PaymentMethod";

import { HiOutlineDotsVertical } from "react-icons/hi";

import { formatCurrency } from "@/utils/helpers";
import Modal from "@/ui/Modal";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";
import ChangeStatus from "./changeStatus";
import DeleteOrder from "./DeleteOrder";

function TableOrders() {
  const { orders, count, isPending } = useOrders();
  const navigate = useNavigate();
  //   console.log(orders);

  if (isPending) return <Loader isLoading={isPending} />;

  return (
    <div className="mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID do Pedido</TableHead>
            <TableHead>Nome Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Troco</TableHead>
            <TableHead>Tipo de Consumo</TableHead>
            <TableHead>Endereço de Entrega</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Preço Final</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders
            ?.filter((order) => order.deliveryType !== "local")
            .map((order) => (
              <React.Fragment key={order.id}>
                <Modal>
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {order?.usuarios?.fullName ?? order.pedidoLocal}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <PaymentMethod type={order.paymentMethod} />
                    </TableCell>
                    <TableCell>
                      {order.changeFor !== null
                        ? formatCurrency(order.changeFor)
                        : "-"}
                    </TableCell>
                    <TableCell>{order.deliveryType}</TableCell>
                    <TableCell>{order.deliveryAddress || "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={
                            (order.status === "cancelado" ||
                              order.status === "pago") &&
                            "cursor-auto"
                          }
                        >
                          <StatusOrders
                            label={order.status}
                            status={order.status}
                          />
                        </DropdownMenuTrigger>

                        {order.status !== "pago" &&
                          order.status !== "cancelado" && (
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Alterar Status
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {order.status === "pendente" && (
                                <DropdownMenuItem>
                                  <Modal.Open opens="prepararPedido">
                                    <button>Preparar</button>
                                  </Modal.Open>
                                </DropdownMenuItem>
                              )}
                              {order.status === "confirmado" && (
                                <DropdownMenuItem>
                                  <Modal.Open opens="pedidoPronto">
                                    <button>Pronto</button>
                                  </Modal.Open>
                                </DropdownMenuItem>
                              )}
                              {(order.status === "servido" ||
                                order.status === "pronto") && (
                                <DropdownMenuItem>
                                  <Modal.Open opens="pedidoPago">
                                    <button>Pago</button>
                                  </Modal.Open>
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuItem>
                                <Modal.Open opens="pedidoCancelado">
                                  <button>Cancelar</button>
                                </Modal.Open>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          )}
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>{formatCurrency(order.finalPrice)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md bg-stone-200 p-2">
                          <HiOutlineDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Infos</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {/* {order.status !== "pago" && (
                            <DropdownMenuItem>
                              <button
                                onClick={() => navigate(`/pedidos/${order.id}`)}
                              >
                                Editar
                              </button>
                            </DropdownMenuItem>
                          )} */}

                          <DropdownMenuItem>
                            <Modal.Open opens="orderDetails">
                              <button>Detalhes</button>
                            </Modal.Open>
                          </DropdownMenuItem>

                          {order.status !== "pago" && (
                            <DropdownMenuItem>
                              <Modal.Open opens="deleteOrder">
                                <button>Deletar</button>
                              </Modal.Open>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <Modal.Window name="orderDetails" maxWidth="max-w-2xl">
                    <OrderDetail item={order} />
                  </Modal.Window>

                  <Modal.Window name="deleteOrder">
                    <DeleteOrder
                      orderId={order.id}
                      nameUser={order?.usuarios?.fullName ?? order.pedidoLocal}
                    />
                  </Modal.Window>

                  <Modal.Window name="prepararPedido">
                    <ChangeStatus order={order} status="confirmado" />
                  </Modal.Window>

                  <Modal.Window name="pedidoPronto">
                    <ChangeStatus order={order} status="pronto" />
                  </Modal.Window>

                  <Modal.Window name="pedidoPago">
                    <ChangeStatus order={order} status="pago" />
                  </Modal.Window>

                  <Modal.Window name="pedidoCancelado">
                    <ChangeStatus order={order} status="cancelado" />
                  </Modal.Window>
                </Modal>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
      <PaginationOrders count={count} />
    </div>
  );
}

export default TableOrders;
