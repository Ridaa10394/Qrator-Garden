import jwt from "jsonwebtoken";

export const isAuth = async(req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(404).json({message:"Token not found"})
    }
    //verify token
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        req.userId=decoded.id
        next()

    

    }catch(error){
        res.status(401).json({message:"token not verified"})

    }


}