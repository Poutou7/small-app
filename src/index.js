import { createRoot } from 'react-dom/client';
import './fontawesome/css/all.min.css';
import './fontawesome/css/normalize.css';
import './framework.css'
import './index.css';
import './routes.css';


import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Root, { getContacts } from './routes/Root';
import ErrorPage from './ErrorPage';
import Index from './routes/Index';
import Contact, { contactAction, loaderContact } from './routes/Contact';
import EditContact, { editContact } from './routes/EditContact';
import CreateContact, { createContact } from './routes/CreateContact';
import { deleteContact } from './routes/destory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const s = url.searchParams.get("search");
      const contacts = await getContacts(s);
      return { contacts, s };
    },
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "contacts/:contactID",
        element: <Contact />,
        loader: loaderContact,
        action: contactAction,
      },
      {
        path: "contacts/:contactID/edit",
        element: <EditContact />,
        loader: loaderContact,
        action: editContact,
      },
      {
        path: "contacts/:contactID/destroy",
        action: deleteContact,
        errorElement: <div>Oops! There was an error.</div>,
      },
      {
        path: "contacts/create-new-contact",
        element: <CreateContact />,
        action: createContact,
      },
    ]
  },
]);



const root = createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);