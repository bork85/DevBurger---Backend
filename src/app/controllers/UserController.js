import { v4 } from 'uuid';
import User from '../models/User.js';
import * as Yup from 'yup';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({        
            name: Yup.string().required().min (3),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        }); 
        try{
            schema.validateSync(req.body, { abortEarly: false });
        }catch(err){
            return res.status(400).json({ error: err.errors});
        }
        const { name, email, password, admin } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        
        const user = await User.create({
            id: v4(),
            name: name,
            email: email,
            password: password,
            admin: admin ?? false, // valor padrão caso não seja enviado
        });
        return res.status(201).json({
            id: user.id,
            name,
            email}
        );
    }
}
export default new UserController();
