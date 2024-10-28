import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { NoteService } from "../app/service/NoteService";
import { INote } from "../entities/model/INote";
import NoteBlock from "../widgets/NoteBlock";
import { useNavigate } from "react-router-dom";
import { CREATE_ROUTE, NOTE_ROUTE } from "../app/routes/utils";
import Input from "../shared/ui/Input";



const NotesPage: React.FC = () => {

    const { userStore } = useContext(Context)
    const [userNotes, setUserNotes] = useState<INote[]>([])
    const [filteredNotes, setFilteredNotes] = useState<INote[]>([])
    const navigate = useNavigate()
    const [isSerch, setIsSerch] = useState(false)

    useEffect(() => {
        fetchUserNotes()
    }, [])

    const fetchUserNotes = async () => {
        try {
            const response = await NoteService.fetchUserNotes(userStore.user.id)
            const userNotes = response.data
            if (Array.isArray(userNotes)) {
                setUserNotes(userNotes)

            } else {
                setUserNotes([])
            }
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    const createNoteHandler = async () => {
        navigate(NOTE_ROUTE + CREATE_ROUTE)
    }


    const noteFindHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let pattern = e.target.value.toLowerCase();
        if (pattern === "") {
            setFilteredNotes([]);
        } else {
            let result = userNotes.filter(item =>
                item.tags.some(tag => tag.name.toLowerCase().startsWith(pattern))
            );

            console.log(result)
            setFilteredNotes(result);
        }
        if (pattern.length !== 0) {
            setIsSerch(true)
        } else {
            setIsSerch(false)
        }
    }

    return (
        <>
            <button
                onClick={createNoteHandler}
                style={{ cursor: 'pointer', background: '#56C999', padding: '6px', marginBottom: '50px', boxSizing: 'border-box', border: 'none', color: 'white', fontSize: '20px', borderRadius: '7px' }}
            >
                Создать заметку
            </button>
            <Input
                placeholder="Поиск по тегам"
                type="text"
                onChange={(e) => noteFindHandler(e)}
                width="50%"
            />
            {
                (isSerch ? filteredNotes : userNotes).map((item) => (
                    <NoteBlock key={item.id} note={item} />
                ))
            }
        </>
    )
}

export default NotesPage