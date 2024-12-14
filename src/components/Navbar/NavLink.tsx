import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

export const NavLink: FC<Props> = ({ path, title }): JSX.Element => {
  let url: string = useLocation().pathname.slice(1);

  return (
    <li className="nav-item">
      <Link
        to={`/${path}`}
        className={`nav-link ${url === path ? "active" : ""}`}
      >
        {title}
      </Link>
    </li>
  );
};
