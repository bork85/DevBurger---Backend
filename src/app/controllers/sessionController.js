import * as Yup from 'yup';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
    async store(req, res) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });
        const isValid = await schema.isValid(req.body);
        const inputsIsValid = () => {
            return res.status(401).json({ error: 'User not found or Password does not match. Verify inputs!' });

        }
        if (!isValid) {
            inputsIsValid();
        }

        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            inputsIsValid();
        }
        if (!(await user.checkPassword(password))) {
            inputsIsValid();
        }
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
        });
    }
}
export default new SessionController();
