import {Router} from "express";
import prisma from "./db";
import {body} from "express-validator";
import {createUser, signIn} from "./handlers/user";
import {handleInputErrors} from "./modules/middleware";
import {loadChat, saveChat} from "./handlers/chat";

const router = Router();

/*
* User Section
*/

router.post('/signUp',
    body('first_name').isString().isEmpty(),
    body('last_name').isString().isEmpty(),
    body('mobile').isString().isEmpty(),
    body('password').isString().isEmpty(),
    // handleInputErrors,
    createUser
);

router.post('/signIn',
    body('mobile').isString().isEmpty(),
    body('password').isString().isEmpty(),
    signIn
);

/*
* Chat Section
*/

router.post('/saveChat',
    body('from_user_id').isString().isEmpty(),
    body('to_user_id').isString().isEmpty(),
    body('message').isString().isEmpty(),
    saveChat
);

router.post('/findChat',
    body('from_user_id').isString().isEmpty(),
    body('to_user_id').isString().isEmpty(),
    loadChat
)

/*router.use((err, req, res, next) => {
    console.error(err);
    res.json({message: 'in a router handler'});

});*/

export default router;