import { useUser } from "@/features/users/useUser";
import FormUpdateSettings from "../features/settings/FormUpdateSettings";
import SemPermissao from "@/ui/SemPermissao";
import Loader from "@/ui/Loader";

function Settings() {
  const { user, isPending } = useUser();

  if (user.user_metadata.userType !== "admin") {
    return <SemPermissao />;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    // <div className="flex w-full items-center justify-center sm:flex-1">
    <div className="w-full items-center justify-center px-6 sm:flex">
      <FormUpdateSettings />
    </div>
  );
}

export default Settings;
