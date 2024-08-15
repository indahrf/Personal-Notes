import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function ArchiveButton2({ id, onArchive }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <button
            className="note-item__archive-button"
            onClick={() => onArchive(id)}
          >
            {locale === "id" ? "Buka Arsip" : "Unarchive"}
          </button>
        );
      }}
    </LocaleConsumer>
  );
}

ArchiveButton2.propTypes = {
  id: PropTypes.string.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default ArchiveButton2;
