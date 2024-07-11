import { Request } from "express";

export interface requestExtends extends Request {  
	user?: any;
	id?: any;
}

