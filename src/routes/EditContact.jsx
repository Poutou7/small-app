import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

export default function EditContact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  const cancel = () => {
    navigate(-1);
  };

  return (
    <>
      <h1 className="title">Edit Contact</h1>
      <Form
        id="contact-form"
        method="post"
        action={`/contacts/${contact.id}/edit`}
      >
        <div className="name">
          <span>Name</span>
          <p>
            <input
              placeholder="First name"
              aria-label="First name"
              type="text"
              name="first"
              defaultValue={contact.first}
            />
            <input
              placeholder="Last name"
              aria-label="Last name"
              type="text"
              name="last"
              defaultValue={contact.last}
            />
          </p>
        </div>
        <label>
          <span>Twitter</span>
          <input
            type="text"
            name="twitter"
            placeholder="@jack"
            defaultValue={contact.twitter}
          />
        </label>
        <label>
          <span>Avatar URL</span>
          <input
            placeholder="https://example.com/avatar.jpg"
            aria-label="Avatar URL"
            type="text"
            name="avatar"
            defaultValue={contact.avatar}
          />
        </label>
        <label>
          <span>Notes</span>
          <textarea name="notes" defaultValue={contact.notes} />
        </label>
        <p className="btns">
          <button type="submit" className="custom-btn save">
            Save
          </button>
          <button type="button" className="custom-btn" onClick={cancel}>
            Cancel
          </button>
        </p>
      </Form>
    </>
  );
}

export const editContact = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`http://localhost:5000/contacts/${params.contactID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(updates),
  });

  return redirect(`/contacts/${params.contactID}`);
};
