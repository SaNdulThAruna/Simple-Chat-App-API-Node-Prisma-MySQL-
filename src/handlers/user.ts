import prisma from "../db";

/*
* create user
 */

export const createUser = async (req, res) => {
    const existingUser = await prisma.user.findFirst({
        where: {
            mobile: req.body.mobile
        }
    });

    if (existingUser) {
        res.status(409);
        res.json({message: 'User already exists'});
        return;
    }

    try {

        const user = await prisma.user.create({
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile,
                password: req.body.password,
                registered_date_time: new Date(),
                user_status_id: 1
            }
        });

        res.json({data: user});

    } catch (e) {
        res.status(400);
        res.json({message: 'Invalid input'});
        return;
    }

}

/*
* SignIn user
 */

export const signIn = async (req, res) => {

    try{

        const user = await prisma.user.findFirst({
            where: {
                mobile: req.body.mobile,
                password: req.body.password
            }
        });

        if (!user) {
            res.status(404);
            res.json({message: 'User not found'});
            return;
        }

        res.json({data: user});

    }catch (e) {
        res.status(500);
        res.json({message: 'Server error'});
        return;
    }

}