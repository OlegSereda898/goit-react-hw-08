import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";
import { addContact, fetchContacts } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter a name!");
      return;
    }

    if (!number.trim()) {
      toast.error("Please enter a phone number!");
      return;
    }

    if (
      contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts!`);
      return;
    }

    dispatch(addContact({ name, number })).then(() => {
      dispatch(fetchContacts());
    });
    toast.success("Contact added successfully!");
    setName("");
    setNumber("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.container}>
        <label className={css.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>

      <div className={css.container}>
        <label className={css.label}>Number</label>
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Phone number"
        />
      </div>

      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
