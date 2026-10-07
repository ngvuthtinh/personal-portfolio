import { FiDownload } from "react-icons/fi";
import { profile } from "../data";

const links = [
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Awards", "#awards"],
  ["Education", "#education"],
  ["Tech Stack", "#skills"],
  ["Contact", "#contact"],
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="logo" href="#top">
          {profile.name}
        </a>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a href={profile.cv} download className="btn btn-sm">
          <FiDownload /> CV
        </a>
      </div>
    </header>
  );
}
