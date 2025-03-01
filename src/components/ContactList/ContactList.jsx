import { useSelector, useDispatch } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import css from "./ContactList.module.css";
import { GrUserManager } from "react-icons/gr";
import { FcPhoneAndroid } from "react-icons/fc";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleDelete = (id, name) => {
    dispatch(deleteContact(id));
    toast.success(`Contact "${name}" deleted!`);
  };

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <div className={css.container}>
            <p>
              <GrUserManager className={css.icon} />
              {name}
            </p>

            <p>
              <FcPhoneAndroid className={css.icon} />
              {number}
            </p>
          </div>
          <button onClick={() => handleDelete(id, name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
