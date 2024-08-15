import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function DeleteButton({ id, onDelete }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <button
            className="note-item__delete-button"
            onClick={() => onDelete(id)}
          >
            {locale === "id" ? "Hapus" : "Delete"}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
