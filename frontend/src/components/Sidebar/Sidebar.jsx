import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Sidebar.css";
import "@flaticon/flaticon-uicons/css/all/all.css"; // All icons

function Sidebar() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const roles = decodedToken.sub.role;
        setUserRole(roles.length > 0 ? roles[0] : null);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleUserManagement = () => {
    navigate("/UserManagement");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  // List of services based on user roles
  const services = [
    {
      name: "Dashboard",
      icon: "fi fi-rr-dashboard-panel",
      onClick: handleDashboard,
    },
    {
      name: "Finance",
      icon: "fi fi-rr-usd-circle",
      subItems: [
        { name: "Invoicing", link: "/Invoicing" },
        { name: "Charge Management", link: "/Charge Management" },
        { name: "Accounting", link: "/Accounting" },
      ],
    },
    {
      name: "CRM",
      icon: "fi fi-rr-target-audience",
      subItems: [
        { name: "Quotation", link: "/quotation" },
        { name: "Customer Management", link: "/customer-management" },
        { name: "Booking Enquiry", link: "/booking-enquiry" },
      ],
    },
    { name: "Air", icon: "fi fi-rr-plane-departure" },
    { name: "Ocean", icon: "fi fi-rr-ship" },
    { name: "Land", icon: "fi fi-rr-truck-check" },
    { name: "Sales", icon: "fi fi-rr-benefit-porcent" },
    {
      name: "Notifications",
      icon: "fi fi-rr-envelope-dot",
      badge: "notification-count",
      count: 40,
    },
    { name: "Security & Access", icon: "fi fi-rr-user-key" },
    { name: "Payments", icon: "fi fi-rr-payroll-check" },
    { name: "Import Data", icon: "fi fi-rr-cloud-download" },
    { name: "Export Data", icon: "fi fi-rr-cloud-upload" },
    { name: "Database", icon: "fi fi-rr-back-up" },
    ...(userRole === "admin"
      ? [
          {
            name: "User Management",
            icon: "fi fi-rr-users-gear",
            onClick: handleUserManagement,
          },
        ]
      : []),
  ];

  return (
    <div>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-name">Freight Management</h1>
          <span className="version">v4.0</span>
        </div>
        <nav className="sidebar-menu">
          <ul className="services-list">
            {services.map((service, index) => (
              <li key={index} className="service-item">
                <div
                  onClick={service.onClick ? service.onClick : null}
                  className="clickable"
                >
                  <i className={service.icon}></i>
                  {service.name}
                  <span className={service.badge}>{service.count}</span>
                  {service.subItems && (
                    <i className="dropdown-icon fi fi-rr-angle-small-down"></i>
                  )}
                </div>
                {service.subItems && (
                  <ul className="dropdown-menu">
                    {service.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => navigate(subItem.link)}
                        className="dropdown-item"
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div>
            <i className="fi fi-rr-settings"></i>
            <a href="/settings">Settings</a>
          </div>
          <div>
            <i className="fi fi-rr-document-signed"></i>
            <a href="/documentation">Documentation</a>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
