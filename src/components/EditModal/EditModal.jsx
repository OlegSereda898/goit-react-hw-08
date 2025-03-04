import { useState } from "react";
import Modal from "react-modal";
import css from "./EditModal.module.css";

Modal.setAppElement("#root");

const EditModal = ({ isOpen, onClose, onSave, contact }) => {
  const [name, setName] = useState(contact?.name || "");
  const [number, setNumber] = useState(contact?.number || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, number });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <h2 className={css.title}>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className={css.container}>
          <label className={css.label}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={contact?.name || "Enter name"}
          />
        </div>

        <div className={css.container}>
          <label className={css.label}>Number</label>
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder={contact?.number || "Enter phone number"}
          />
        </div>

        <div className={css.actions}>
          <button className={css.saveBtn} type="submit">
            Save
          </button>
          <button className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
