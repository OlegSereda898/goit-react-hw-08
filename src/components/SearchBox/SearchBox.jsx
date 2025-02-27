import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectNameFilter);

  return (
    <div className={css.container}>
      <label className={css.label}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(changeFilter(e.target.value))}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default SearchBox;
