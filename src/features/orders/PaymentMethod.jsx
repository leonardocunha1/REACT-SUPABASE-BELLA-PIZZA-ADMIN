import { IoCardOutline } from "react-icons/io5";
import { FaPix } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";

function PaymentMethod({ type }) {
  let icon = null;
  let text = "";

  if (type === "cartao") {
    icon = <IoCardOutline />;
    text = "Cartão";
  }

  if (type === "pix") {
    icon = <FaPix />;
    text = "Pix";
  }

  if (type === "dinheiro") {
    icon = <FaRegMoneyBillAlt />;
    text = "Dinheiro";
  }

  return (
    <p className="flex items-center gap-2">
      {icon}
      {text}
    </p>
  );
}

export default PaymentMethod;
