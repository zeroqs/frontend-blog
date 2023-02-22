interface Utils {
    createdAt : string,
    updatedAt : string,
    __v : number
}
export interface Post extends Utils{
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

}

