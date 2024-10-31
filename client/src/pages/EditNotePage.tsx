import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../shared/ui/Button";
import Input from "../shared/ui/Input";
import { Context } from "../main";
import { useNavigate, useParams } from "react-router-dom";
import { NoteService } from "../app/service/NoteService";
import { Tag } from "../entities/model/INote";
import trash from "../assets/trash.svg";

const StyledEditNotePage = styled.div`
  width: 50%;
  min-width: 500px;
  min-height: 600px;
  height: auto;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  gap: 20px;
`;

const EditNotePage: React.FC = () => {
    const params = useParams();
    const current = params.id;

    const navigate = useNavigate();

    const { userStore, noteStore } = useContext(Context);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const [tags, setTags] = useState<Tag[]>([]);
    const [tagsError, setTagsError] = useState("");

    useEffect(() => {
        fetchUserNote();
    }, []);

    const fetchUserNote = async () => {
        try {
            if (current !== undefined) {
                const response = await NoteService.fetchOneUserNote(
                    userStore.user.id,
                    current
                );
                setName(response.data.name);
                setDescription(response.data.description);
                setTags(response.data.tags);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        if (e.target.value.length === 0) {
            setNameError("Обязательно поле");
        } else {
            setNameError("");
        }
    };

    const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        if (e.target.value.length === 0) {
            setDescriptionError("Обязательно поле");
        } else {
            setDescriptionError("");
        }
    };

    const editNote = async () => {
        if (current !== undefined) {
            noteStore.editNote(current, userStore.user.id, name, description, tags);
        }
        navigate("/");
    };

    const deleteNote = () => {
        if (current !== undefined) {
            noteStore.deliteNote(current, userStore.user.id);
        }
        navigate("/");
    };

    const addTag = () => {
        setTags([...tags, { name: "", number: Date.now() }]);
        setTagsError("Все теги должны иметь непустое имя");
    };

    const changeInfo = (key: string, value: string, number: number) => {
        setTags((prevTags) => {
            const newTags = prevTags.map((i) =>
                i.number === number ? { ...i, [key]: value } : i
            );
            const hasEmptyTag = newTags.some((tag) => tag.name.trim() === "");
            if (hasEmptyTag) {
                setTagsError("Все теги должны иметь непустое имя");
            } else {
                setTagsError("");
            }
            return newTags;
        });
    };

    const removeInfo = (number: number) => {
        setTags(tags.filter((i) => i.number !== number));
    };

    return (
        <>
            <StyledEditNotePage>
                <div
                    style={{
                        display: "flex",
                        minHeight: "50px",
                        height: "auto",
                        gap: "20px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Button background="#56C999" onClick={addTag}>
                        Добавить тег
                    </Button>
                    {tags.map((item) => (
                        <>
                            <div style={{ display: "flex" }}>
                                <input
                                    key={item.number}
                                    style={{
                                        height: "35px",
                                        display: "flex",
                                        padding: "5px",
                                        boxSizing: "border-box",
                                        fontSize: "16px",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100px",
                                        background: "#D9F3FB",
                                        borderRadius: "5px",
                                        border: "none",
                                    }}
                                    type="text"
                                    onChange={(e) =>
                                        changeInfo("name", e.target.value, item.number)
                                    }
                                    value={item.name}
                                />
                                <Button
                                    background="transparent"
                                    onClick={() => removeInfo(item.number)}
                                >
                                    <img src={trash} alt="" />
                                </Button>
                            </div>
                        </>
                    ))}
                </div>
                {tags.length !== 0 && (
                    <p style={{ color: "red", fontSize: "14px" }}>{tagsError}</p>
                )}
                <Input
                    type="text"
                    placeholder="Новая заметка"
                    onChange={(e) => nameHandler(e)}
                    value={name}
                />
                <p style={{ color: "red", fontSize: "14px" }}>{nameError}</p>

                <textarea
                    style={{
                        minHeight: "500px",
                        maxHeight: "500px",
                        minWidth: "100%",
                        maxWidth: "100%",
                        height: "auto",
                        padding: "10px",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                    }}
                    onChange={(e) => descriptionHandler(e)}
                    maxLength={4000}
                    value={description}
                ></textarea>
                <p style={{ color: "red", fontSize: "14px" }}>{descriptionError}</p>

                <div
                    style={{
                        display: "flex",
                        height: "auto",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        background="#56C999"
                        onClick={editNote}
                        disabled={
                            nameError === "" && descriptionError === "" && tagsError === ""
                                ? false
                                : true
                        }
                    >
                        Сохранить
                    </Button>
                    <Button background="#33A6CC" onClick={() => navigate("/")}>
                        Выйти без сохранений
                    </Button>
                    <Button background="#CC5C5C" onClick={deleteNote}>
                        Удалить заметку
                    </Button>
                </div>
            </StyledEditNotePage>
        </>
    );
};

export default EditNotePage;
