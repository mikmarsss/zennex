import React from "react";
import styled from "styled-components";
import { INote } from "../../entities/model/INote";
import { useNavigate } from "react-router-dom";
import { EDIT_ROUTE, NOTE_ROUTE } from "../../app/routes/utils";
import Button from "../../shared/ui/Button";

const StyledNoteBlock = styled.div`
    padding: 24px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: white;
    width: 50%;
    min-height: 200px;
    height: auto;
    display: flex;
    flex-direction: column;
`

interface NoteBlockProps {
    note: INote
}



const NoteBlock: React.FC<NoteBlockProps> = ({ note }) => {

    const navigate = useNavigate()


    const editNoteHandler = async (id: number) => {
        navigate(NOTE_ROUTE + EDIT_ROUTE + '/' + id)
    }





    return (
        <>
            <StyledNoteBlock>
                <div style={{ display: 'flex', gap: '20px' }}>
                    {
                        note.tags.map((item) => (
                            <p style={{ color: 'black', fontSize: '24px', background: '#D9F3FB', borderRadius: '8px', padding: '5px', boxSizing: 'border-box' }} key={item.number}>
                                #
                                {item.name}
                            </p>
                        ))
                    }
                </div>
                <p style={{ fontSize: '28px', margin: '10px 0 0 0' }}>{note.name}</p>
                <p style={{ fontSize: '24px', minHeight: '100px', margin: '20px 0 0 0' }}>{note.description}</p>
                <div style={{ display: 'flex', gap: '20px', marginTop: 'auto' }}>
                    <Button onClick={() => editNoteHandler(note.id)} background="#33A6CC">
                        Редактировать
                    </Button>
                </div>

            </StyledNoteBlock>
        </>
    )
}

export default NoteBlock