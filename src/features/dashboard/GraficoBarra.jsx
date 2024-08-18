import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns";

function GraficoBarra({ orders, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // Mapeando as datas com os dados correspondentes de vendas
  const data = allDates.map((date) => {
    const filteredBookings = orders.filter((booking) =>
      isSameDay(date, new Date(booking.created_at)),
    );

    const categories = filteredBookings.reduce((acc, booking) => {
      booking.order_items.forEach((item) => {
        const category = item.products.category;
        const totalValue = item.priceUnity * item.quantity;

        if (acc[category]) {
          acc[category] += totalValue;
        } else {
          acc[category] = totalValue;
        }
      });
      return acc;
    }, {});

    // Garantindo que as categorias estejam sempre presentes, mesmo se não houver vendas em um dia específico
    return {
      label: format(date, "MMM dd"),
      Pizza: categories.Pizza || 0,
      Bebida: categories.Bebida || 0,
      Sobremesa: categories.Sobremesa || 0,
    };
  });

  if (orders.length === 0) return <div>Nenhum pedido encontrado</div>;

  return (
    <div className="bg-gray-50 p-3">
      <p className="text-center text-stone-500">Total vendas por categoria</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis unit="R$" />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Pizza"
            stackId="a"
            fill={getColorForCategory("Pizza")}
            unit="R$"
          />
          <Bar
            dataKey="Bebida"
            stackId="a"
            fill={getColorForCategory("Bebida")}
            unit="R$"
          />
          <Bar
            dataKey="Sobremesa"
            stackId="a"
            fill={getColorForCategory("Sobremesa")}
            unit="R$"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Função auxiliar para definir cores para as categorias
function getColorForCategory(category) {
  const colors = {
    Pizza: "#8884d8",
    Bebida: "#82ca9d",
    Sobremesa: "#ffc658",
    // Adicione mais categorias e cores conforme necessário
  };
  return colors[category] || "#8884d8"; // Cor padrão
}

export default GraficoBarra;
