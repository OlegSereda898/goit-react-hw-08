import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import DeleteModal from "../DeleteModal/DeleteModal";
import css from "./ContactList.module.css";
import { GrUserManager } from "react-icons/gr";
import { FcPhoneAndroid } from "react-icons/fc";
import EditModal from "../EditModal/EditModal";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
  };

  const handleDelete = () => {
    if (selectedContact) {
      dispatch(deleteContact(selectedContact.id));
      toast.success(`Contact "${selectedContact.name}" deleted!`);
      closeDeleteModal();
    }
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedContact(null);
  };

  const handleUpdate = (updatedData) => {
    dispatch(updateContact({ id: selectedContact.id, updatedData }));
    toast.success(`Contact "${selectedContact.name}" updated!`);
    closeEditModal();
  };

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map((contact) => (
          <li className={css.item} key={contact.id}>
            <div className={css.container}>
              <p>
                <GrUserManager className={css.icon} />
                {contact.name}
              </p>

              <p>
                <FcPhoneAndroid className={css.icon} />
                {contact.number}
              </p>
            </div>
            <div className={css.containerbtn}>
              <button
                className={css.editbtn}
                onClick={() => openEditModal(contact)}
              >
                Edit
              </button>
              <button
                className={css.delbtn}
                onClick={() => openDeleteModal(contact)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleUpdate}
        contact={selectedContact}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        contactName={selectedContact?.name}
      />
    </>
  );
};

export default ContactList;
