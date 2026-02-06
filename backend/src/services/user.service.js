export const getUserByIdService = (id) =>{
    if(!id){
        throw new Error("user id is required");
    }
    return {
        id,
        name:"Babali",
        role: "singer"
    };
};

export const createUserService = (userData)=>{

    const {name, role} = userData;
    
    if(!name|| !role){
        throw new Error("Name and email is mandatory");
    }

    const user = {
        id: Date.now().toString(),
        name: name,
        role: role
    };
    return user;

};