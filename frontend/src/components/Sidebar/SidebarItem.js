import React, { useState } from "react";
import "./Sidebar.css";
import "@flaticon/flaticon-uicons/css/all/all.css"; // All icons

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Render a parent item with children
  if (item.childrens) {
    return (
      <div
        className={`sidebar-item ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-title" onClick={handleToggle}>
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i className={`dropdown-icon fi fi-rr-angle-small-down`}></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  }

  // Render a plain single item
  return (
    <a href={item.path || "#"} className="sidebar-item plain">
      {item.icon && <i className={item.icon}></i>}
      {item.title}
      {item.count && <span className="notification-count">{item.count}</span>}
    </a>
  );
};

export default SidebarItem;
