import {IWish} from "./IPresents";
interface IChild{
    id: number;
    name: string;
    age: number;
    wishes: IWish[];
}

export type { IChild };