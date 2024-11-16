export interface Register{
    _id:string
    ammuntion: any
    username:string
    password:string
    organition:string
    location?:string

}


export interface LoginDto{
    username:string
    password:string
}