import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import { useSelector, useDispatch } from "react-redux";
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contacts/selectors";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../../redux/contacts/operations";
import { changeFilter } from "../../redux/filters/slice";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (newContact) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error(`${newContact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newContact));
    toast.success("Contact added successfully!");
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
    toast.success("Contact deleted successfully!");
  };

  const handleSearch = (query) => {
    dispatch(changeFilter(query));
  };

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <>
      <h1 className={css.title}>Contacts</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox onSearch={handleSearch} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </>
  );
};

export default ContactsPage;
