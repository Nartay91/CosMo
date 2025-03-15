import useBranchStore from "../store/useBranchStore";

const DeleteBranchModal = ({ branch, onClose }) => {
  const { deleteBranch } = useBranchStore();

  const handleDelete = () => {
    deleteBranch(branch.id);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Удалить филиал</h2>
        <p>Вы уверены, что хотите удалить филиал <strong>{branch.name}</strong>?</p>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel">Отмена</button>
          <button onClick={handleDelete} className="delete">Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBranchModal;
