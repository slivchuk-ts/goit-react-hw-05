import { Link } from "react-router-dom";
import s from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404 - Page Not Found</h1>
      <p className={s.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={s.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;