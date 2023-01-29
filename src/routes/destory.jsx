import { redirect } from "react-router-dom";

export async function deleteContact({ params }) {
  await fetch(`http://localhost:5000/contacts/${params.contactID}`, {
    method: "DELETE",
  });

  return redirect("/");
}
