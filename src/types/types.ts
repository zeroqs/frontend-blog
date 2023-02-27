interface Utils {
    createdAt? : string,
    updatedAt? : string,
    __v? : number
}
export interface PostsI extends Utils{
    _id : string,
    title : string,
    text : string,
    tags : [],
    viewsCount : number,
    imageURL? : string
    user : User,
}

export interface User extends Utils{
    _id : string,
    fullName : string,
    email : string,
    password : string,
    avatarUrl : string,
    token : string
}
export interface PostI extends Utils {
    _id : string,
    title : string,
    imageUrl : string,
    viewsCount : number,
    user : User,
    text? : string,
    commentsCount : number,
    children? : [],
    tags : [],
    isFullPost? : boolean,
    isLoading : boolean,
    isEditable : boolean,
}

export interface FormValues  {
    email: string;
    password: string;
}

export interface FormRegistrationValues {
    fullName : string,
    email : string,
    password : string,
}

