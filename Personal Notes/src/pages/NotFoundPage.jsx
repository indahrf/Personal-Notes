import { LocaleConsumer } from "../contexts/LocaleContext";

function NotFoundPage() {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <div className="not-found">
            <br />
            <h1>404 - {locale === "id" ? "Halaman tidak ditemukan" : "Page Not Found"}</h1>
            <br />
            <p> {locale === "id" ? "Halaman yang Anda cari tidak ada." : "The page you are looking for does not exist."}</p>
          </div>
        );
      }}
    </LocaleConsumer>
  );
}

export default NotFoundPage;
