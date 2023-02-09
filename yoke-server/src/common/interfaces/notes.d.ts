import { Document } from 'mongoose';

export interface ILink {
  position: number;
  length: number;
  url: string;
}

export interface INote extends Document {
  id?: string;
  title: string;
  text: string;
  links: ILink[];
  owner: string;
}

export interface IUpdateNote {
  title?: string;
  text?: string;
  links?: ILink[];
  owner?: string;
}
