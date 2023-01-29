import React, { useEffect } from "react";

import "../root.css";

import logoReact from "../images/logo.png";
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";

const Root = () => {
  const { contacts, s } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const createContact = () => {
    navigate(`contacts/create-new-contact`);
  };

  useEffect(() => {
    document.getElementById("search").value = s;
  }, [s]);

  return (
    <div className={"content"}>
      <div className={"sidebar"}>
        <div className={"search"}>
          <Form
            className={"searchForm"}
            role="search"
            onChange={(event) => {
              const isFirstSearch = s == null;
              submit(event.currentTarget, {
                replace: !isFirstSearch,
              });
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              id="search"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="search"
              defaultValue={s}
            />
          </Form>
          <div className={"submitForm"}>
            <button
              type="submit"
              className="custom-btn"
              onClick={createContact}
            >
              New
            </button>
          </div>
        </div>
        <nav>
          <ul>
            {contacts ? (
              contacts.map((contact) => {
                return (
                  <li key={contact.id}>
                    <NavLink to={`/contacts/${contact.id}`}>
                      {contact.first} {contact.last}
                    </NavLink>
                    {contact.favorite && (
                      <span className="material-icons-outlined">star</span>
                    )}
                  </li>
                );
              })
            ) : (
              <p>No Name</p>
            )}
          </ul>
        </nav>
        <div className={"logo"}>
          <img src={logoReact} alt="logo" />
          <p>React Router Contacts</p>
        </div>
      </div>
      <div
        id={"detail"}
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

export async function getContacts(search) {
  try {
    const res = await fetch(`http://localhost:5000/contacts/`);
    const contacts = await res.json();

    if (search) {
      const dataSearch = contacts.filter((contact) => {
        return contact.first.includes(search) || contact.last.includes(search);
      });
      return dataSearch;
    }
    return contacts;
  } catch (error) {
    throw new Response("", {
      status: 404,
      statusText: "Failed To Fetch",
    });
  }
}
