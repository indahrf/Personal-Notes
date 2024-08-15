import { LocaleConsumer } from "../contexts/LocaleContext";

function LanguageToggle() {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => (
        <button className="icon" onClick={toggleLocale}>
          {locale === "id" ? "en" : "id"}
        </button>
      )}
    </LocaleConsumer>
  );
}

export default LanguageToggle;
