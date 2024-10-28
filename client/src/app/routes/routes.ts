import CreateNotePage from "../../pages/CreateNotePage";
import EditNotePage from "../../pages/EditNotePage";
import NotesPage from "../../pages/NotesPage";
import { CREATE_ROUTE, EDIT_ROUTE, NOTE_ROUTE } from "./utils";

export const authRoutes = [
    {
        path: '/',
        Component: NotesPage
    },
    {
        path: NOTE_ROUTE + CREATE_ROUTE,
        Component: CreateNotePage
    },
    {
        path: NOTE_ROUTE + EDIT_ROUTE + '/:id',
        Component: EditNotePage
    },
]