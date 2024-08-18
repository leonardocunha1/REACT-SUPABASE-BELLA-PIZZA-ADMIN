import {
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
  startOfDay,
} from "date-fns";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function GraficoOnda({ orders, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    const startDate = startOfDay(date); // Ajusta a data para o início do dia
    return {
      label: format(startDate, "MMM dd"),
      delivery: orders.filter(
        (order) =>
          order.deliveryType === "entrega" &&
          isSameDay(startDate, new Date(order.created_at)),
      ).length,
      retirada: orders.filter(
        (order) =>
          order.deliveryType === "retirada" &&
          isSameDay(startDate, new Date(order.created_at)),
      ).length,
    };
  });

  return (
    <div className="flex-1 bg-gray-50 p-5">
      <p className="mb-4 text-center text-stone-500">Tipos de pedido</p>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: "#333" }}
            tickLine={{ stroke: "#333" }}
          />
          <YAxis tick={{ fill: "#333" }} tickLine={{ stroke: "#333" }} />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: "#fff", color: "#000" }} />
          <Area
            dataKey="retirada"
            type="monotone"
            stroke="#8884d8"
            fill="#8884d8"
            strokeWidth={2}
            name="Total retiradas"
          />
          <Area
            dataKey="delivery"
            type="monotone"
            stroke="#82ca9d"
            fill="#82ca9d"
            strokeWidth={2}
            name="Total deliveries"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoOnda;
