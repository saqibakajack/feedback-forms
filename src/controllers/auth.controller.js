import {sign} from 'jsonwebtoken';

export const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        throw new Error('Please provide username and password');
    }

    const token = sign({
        username, password
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    res.status(200).json({token});
}
