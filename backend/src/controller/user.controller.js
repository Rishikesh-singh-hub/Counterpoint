import {
    createUserService,
    getUserByIdService
} from "../services/user.service.js";

export const createUser = (req,res)=>{
    const user = createUserService(req.body);
    res.status(201).json(user);
}

export const getUserById = (req,res,next) => {
    let user = null
    try{
        user = getUserByIdService(req.params.id);
        if(user == null){
            return res.status(404).json({message:"NOT FOUND"});
        }
    }catch(err){
        next(err);
    }
    
    res.status(201).json(user);
}