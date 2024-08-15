import { useState, useEffect } from "react";
import NotesDetail from "../components/NotesDetail";
import { getNote } from "../utils/api";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingIndicator from "../components/LoadingIndicator";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

function DetailPage({ id }) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNote(id);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!note) {
    return <p>Note is not found!</p>;
  }

  return (
    <section>
      <NotesDetail {...note} />
    </section>
  );
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
