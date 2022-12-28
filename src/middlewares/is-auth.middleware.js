import {verify} from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new Error('Not authenticated.');
    }
    let decodedToken;
    try {
        decodedToken = verify(token, process.env.JWT_SECRET);
    }catch (e) {
        throw new Error('Not authenticated.');
    }
    if (!decodedToken) {
        throw new Error('Not authenticated.');
    }
    if (!decodedToken.username || !decodedToken.password) {
        throw new Error('Not authenticated.');
    }
    req.username = decodedToken.username;
    req.password = decodedToken.password;
    next();
}

export default isAuth;
