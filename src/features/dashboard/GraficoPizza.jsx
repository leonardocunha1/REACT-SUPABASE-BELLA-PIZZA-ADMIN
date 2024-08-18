import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// cores geradas no GPT
const COLORS = [
  "#8884d8", // Roxo claro
  "#00C49F", // Verde esmeralda
  "#FFBB28", // Amarelo
  "#FF8042", // Laranja
  "#0088FE", // Azul
  "#FF6361", // Coral
  "#6A4C93", // Roxo escuro
  "#B6E2A1", // Verde claro
  "#FF7F50", // Salmão
  "#D0ED57", // Verde amarelado
  "#FFC0CB", // Rosa claro
  "#A569BD", // Lilás
  "#C0C0C0", // Cinza claro
  "#FF4500", // Laranja avermelhado
];

function GraficoPizza({ orders }) {
  //   console.log(orders);
  const pizzasMaisVendidas = orders.reduce((acc, order) => {
    order.order_items.forEach((item) => {
      if (item.products.category === "Pizza") {
        acc[item.products.name] = acc[item.products.name]
          ? acc[item.products.name] + item.quantity
          : item.quantity;
      }
    });
    return acc;
  }, {});
  //   console.log(pizzasMaisVendidas);

  // o Object.keys retorna um array com as chaves do objeto
  const data = Object.keys(pizzasMaisVendidas).map((pizza) => ({
    name: pizza,
    value: pizzasMaisVendidas[pizza],
  }));

  return (
    <div className="flex-1 bg-gray-50 p-5">
      <p className="text-center text-stone-500">Pizzas mais vendidas</p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            //   cx={120}
            //   cy={200}
            cy="60%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoPizza;
