export type FormTypes = 'login' | 'signup';

export interface UserContent {
    email: string;
    id:string;
	password?:string;
}
interface IFormData{
	email: string;
	password: string;
	confirmPassword?:string;
}
export interface AllContext {
	showForm: FormTypes;
	handleLogout: ()=>void;
	changeForm:(type:FormTypes) => void;
	handleLogin: (formData: IFormData) => void;
	handleSignup: (formData: IFormData) => void;
	handleLoginSuccess: (token: string, user: UserContent) => void;
	// alert:{message:string, color:AlertColor};
	// changeAlert:({message,color}:{message:string,color:AlertColor})=>void;
	user:UserContent | null;
}