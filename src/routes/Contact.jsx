import React from "react";
import {
  Form,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { editContact } from "./EditContact";

const Contact = () => {
  const contact = useLoaderData();
  const navigate = useNavigate();

  const editContact = () => {
    navigate(`edit`);
  };

  return (
    <div className="contacts">
      <div className="image">
        <img src={contact.avatar || null} alt="" />
      </div>
      <div className="info">
        <div>
          <h1>
            {contact.first} {contact.last}
          </h1>
          <Favorite contact={contact} />
        </div>
        {contact.twitter && (
          <h2>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </h2>
        )}
        <p>{contact.notes}</p>
        <button className="edit custom-btn" onClick={editContact}>
          Edit
        </button>
        <Form
          method="post"
          action={`/contacts/${contact.id}/destroy`}
          style={{ display: "inline" }}
        >
          <button className="delete custom-btn">Delete</button>
        </Form>
      </div>
    </div>
  );
};

export default Contact;

function Favorite({ contact }) {
  const fetcher = useFetcher();

  // yes, this is a `let` for later
  let favorite = contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? (
          <span className="material-icons-outlined true">star</span>
        ) : (
          <span className="material-icons-outlined false">grade</span>
        )}
      </button>
    </fetcher.Form>
  );
}

export async function loaderContact({ params }) {
  const res = await fetch(`http://localhost:5000/contacts/${params.contactID}`);
  return await res.json();
}

export async function contactAction({ request, params }) {
  let formData = await request.formData();

  return await fetch(`http://localhost:5000/contacts/${params.contactID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      favorite: formData.get("favorite") === "true",
    }),
  });
}
