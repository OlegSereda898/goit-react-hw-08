import Modal from "react-modal";
import css from "./DeleteModal.module.css";

Modal.setAppElement("#root");

const DeleteModal = ({ isOpen, onClose, onConfirm, contactName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2 className={css.title}>Delete Contact</h2>
      <p className={css.text}>
        Are you sure you want to delete <b>{contactName}</b>?
      </p>
      <div className={css.actions}>
        <button className={css.confirmBtn} onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className={css.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
