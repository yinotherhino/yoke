export type FormTypes = 'login' | 'signup';

export interface UserContent {
    email: string;
    _id:string;
	password?:string;
}
interface IFormData{
	email: string;
	password: string;
	confirmPassword?:string;
}
interface ILink {
	position: number,
	length: number,
	url: string,
}
interface INote{
	owner:string,
	text:string,
	links:ILink[],
}
type INoteData = Omit<INote, "owner">
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