import { Document } from 'mongoose';

export interface ILink {
  start: number;
  end: number;
  url: string;
}

export interface INote extends Document {
  _id?: string;
  text: string;
  links: ILink[];
  owner: string;
}

export interface IUpdateNote {
  text?: string;
  links?: ILink[];
  owner?: string;
}
