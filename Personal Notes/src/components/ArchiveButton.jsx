import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ArchiveButton({ id, onArchive }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}
          >
            {locale === "id" ? "Arsipkan" : "Archive"}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

ArchiveButton.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
