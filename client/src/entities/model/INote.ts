export interface INote {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
}

export type Tag = { name: string; number: number };
