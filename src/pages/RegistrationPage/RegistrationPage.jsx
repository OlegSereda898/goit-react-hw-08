import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div>
      <h2 className={css.title}>Registration</h2>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
