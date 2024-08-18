import Modal from "@/ui/Modal";
import CreateUserForm from "./CreateUserForm";
import Button from "@/ui/Button";

function CreateUser() {
  return (
    <div className="mt-5">
      <Modal>
        <Modal.Open opens="cadastrar">
          <Button size="large">Cadastrar</Button>
        </Modal.Open>

        <Modal.Window name="cadastrar">
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default CreateUser;
