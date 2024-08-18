import CreateUser from "@/features/users/CreateUser";
import { useUser } from "@/features/users/useUser";
import SemPermissao from "@/ui/SemPermissao";
import TableArea from "@/ui/TableArea";
import { Loader } from "lucide-react";

function Users() {
  const { user, isPending } = useUser();

  //   console.log(user);

  if (user.user_metadata.userType !== "admin") {
    return <SemPermissao />;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <TableArea>
      <h3 className="text-3xl font-bold">Users</h3>
      <CreateUser />
    </TableArea>
  );
}

export default Users;
