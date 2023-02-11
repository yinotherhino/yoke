export type FormTypes = 'login' | 'signup';

export interface UserContent {
    email: string;
    _id:string;
	password?:string;
}
export interface IFormData{
	email: string;
	password: string;
	confirmPassword?:string;
}
export interface ILink {
	start: number;
	end: number;
	url: string;
}
export interface INote{
	_id?:string;
	owner:string;
	text:string;
	links:ILink[];
}
export type INoteData = Omit<INote, "owner">
export interface AllContext {
	showForm: FormTypes;
	handleLogout: ()=>void;
	changeForm:(type:FormTypes) => void;
	handleLogin: (formData: IFormData) => void;
	handleSignup: (formData: IFormData) => void;
	handleLoginSuccess: ({token: string, user: UserContent}) => void;
	setShowDashForm: React.Dispatch<React.SetStateAction<"addnote" | "editnote" | null>>;
	showDashForm: "addnote" | "editnote" | null;
	user:UserContent | null;
	handleDeleteAccount: () => Promise<void>;
	handleAddNote: (noteData: INoteData) => Promise<void>;
}