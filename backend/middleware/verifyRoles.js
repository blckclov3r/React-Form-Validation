 const verifyRoles = (...allowedRoles) =>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles];
        console.log('rolesArray: ',rolesArray)
        console.log('reqRoles',req.roles);

        const result = req.roles.map(role => rolesArray.includes(role)).find(val=>val === true);
        console.log('verifyRoles result: ',result);
        if(!result) return res.sendStatus(401);
        next();
        
    }
}
export default verifyRoles;