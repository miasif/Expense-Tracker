import { Link, useLocation } from "react-router-dom";
import "./footer.css";
import { useEffect, useState } from "react";

const links = [
  { to: "/expense-tracker", icon: "home-outline", text: "Home" },
  { to: "/transactions", icon: "newspaper-outline", text: "History" },
  { to: "/add-transaction", icon: "add-circle-outline", text: "Add" },
  { to: "/categories", icon: "folder-open-outline", text: "Category" },
];

function Footer() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const activeLinkIndex = links.findIndex(
      (link) => link.to === location.pathname
    );
    setActiveIndex(activeLinkIndex);
  }, [location.pathname]);

  return (
    <footer className="mob_navigation">
      <ul>
        {links.map((link, index) => (
          <li
            key={index}
            className={`list ${index === activeIndex ? "active" : ""}`}
          >
            <Link to={link.to} className="nav-link">
              <span className="icon">
                <ion-icon name={link.icon}></ion-icon>
              </span>
              <span className="text">{link.text}</span>
            </Link>
          </li>
        ))}
        <div
          className="indicator"
          style={{ transform: `translateX(calc(70px * ${activeIndex}))` }}
        ></div>
      </ul>
    </footer>
  );
}

export default Footer;
