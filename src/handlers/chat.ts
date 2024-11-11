import prisma from "../db";

/*
* save chat
 */
export const saveChat = async (req, res) => {
    try {
        const chat = await prisma.chat.create({
            data: {
                from_user_id: parseInt(req.body.from_user_id),
                to_user_id: parseInt(req.body.to_user_id),
                message: req.body.message,
                date_time: new Date(),
                chat_status_id: 1
            }
        });

        if (chat) {
            res.json({data: chat});
            return;
        }
    }catch (e) {
        res.status(500);
        res.json({message: 'Server error'});
    }
}

/*
* load chat
 */

export const loadChat = async (req,res) => {
    // try {

        const chat = await prisma.chat.findMany({
            where:{
                OR:[
                    {
                        from_user_id: parseInt(req.body.from_user_id),
                        to_user_id: parseInt(req.body.to_user_id)
                    },
                    {
                        from_user_id: parseInt(req.body.to_user_id),
                        to_user_id: parseInt(req.body.from_user_id)
                    }
                ]
            },
            orderBy:{
                date_time: 'desc'
            }
        })

        res.json({data: chat});

    // }catch (e) {
    //     res.status(500);
    //     res.json({message: 'Server error'});
    // }
}


