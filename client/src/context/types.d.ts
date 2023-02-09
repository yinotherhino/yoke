export type FormTypes = 'login' | 'signup' | 'forgot_password';

export interface UserContent {
    email: string;
    firstName:string;

}

export interface AllContext {
	showForm: FormTypes;
	changeForm:(type:FormTypes) => void;
	handleLoginSuccess: (token: string, user: UserContent) => void;
	alert:{message:string, color:AlertColor};
	changeAlert:({message,color}:{message:string,color:AlertColor})=>void;
	user:UserContent | null;
}