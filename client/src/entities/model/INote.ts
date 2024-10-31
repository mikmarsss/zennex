export interface INote {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    createdAt: Date;
    updatedAt: Date;
}

export type Tag = { name: string; number: number };
