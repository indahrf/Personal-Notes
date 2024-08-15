import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PersonalNotes from "./components/PersonalNotes";

import "./styles/style.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PersonalNotes />
  </BrowserRouter>
);
