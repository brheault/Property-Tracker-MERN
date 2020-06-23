import jwt from 'jsonwebtoken';

//This should eventually be imported from elsewhere:
const jwtSecret= "pt_myJwtSecret";

//Authenticates user by Token for private API calls
function auth(req, res, next){
    //Token will be sent in the request
    const token = req.header('x-auth-token');

    //Check Token Existence
    if(!token) res.status(401).json({msg: 'No token provided, authorization denied'});

    try{
        //Verify Token
        const decoded = jwt.verify(token, jwtSecret);

        //Add user from payload gotten from the token
        req.user = decoded;
        next();
    } catch (e){
        res.status(400).json({msg:'Token is invalid'})
    }
}

export default auth;