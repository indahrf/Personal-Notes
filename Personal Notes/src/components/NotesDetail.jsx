import PropTypes from "prop-types";
import { showFormattedDate } from "../utils/index";

function NotesDetail({ data }) {
  const { title, createdAt, body } = data;
  const dates = showFormattedDate(createdAt);

  return (
    <div>
      <h2>{title}</h2>
      <p>{dates}</p>
      <p>{body}</p>
    </div>
  );
}

NotesDetail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};
export default NotesDetail;
