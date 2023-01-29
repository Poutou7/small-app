import React from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";

function CreateContact() {
  const navigate = useNavigate();

  const data = useActionData();

  return (
    <>
      <h1 className="title">Create New Contact</h1>
      <Form
        id="contact-form"
        method="post"
        action="/contacts/create-new-contact"
      >
        <div className="name">
          <span>Name</span>
          <p>
            <input
              placeholder="First name"
              aria-label="First name"
              type="text"
              name="first"
            />
            {data && data.error && <span>{data.error}</span>}
            <input
              placeholder="Last name"
              aria-label="Last name"
              type="text"
              name="last"
            />
          </p>
        </div>
        <label>
          <span>Twitter</span>
          <input type="text" name="twitter" placeholder="@jack" />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" placeholder="Create Notes" />
        </label>
        <p className="btns">
          <button type="submit" className="custom-btn save">
            Save
          </button>
          <button
            type="button"
            className="custom-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </p>
      </Form>
    </>
  );
}

export default CreateContact;

export const createContact = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  // const submission = {
  //   first: formData.get("first"), // name="first"
  //   last: formData.get("last"), // name="last"
  //   avatar: formData.get("avatar"), // name="avatar"
  //   twitter: formData.get("twitter"),
  //   notes: formData.get("notes"),
  // };

  await fetch(`http://localhost:5000/contacts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...updates, favorite: false }),
  });

  if (updates.first.length < 1) {
    return { error: "Enter Your Firstname" };
  }

  return redirect("/contacts/create-new-contact");
};
