import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { DatabaseError } from "pg";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import userRepository from "../repositories/user.repository";
const usersRouter = Router();

usersRouter.get('/users',jwtAuthenticationMiddleware, async (req : Request, res : Response, next : NextFunction ) => {
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users)
});


usersRouter.get('/users/:uuid', async ( req : Request<{ uuid : string }>, res : Response, next : NextFunction ) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send({ user });
        
    } catch (error) {
       next(error);
    }
   
});

usersRouter.post('/users', async (req : Request<{ uuid : string }>, res : Response, next : NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
});

usersRouter.put('/users/:uuid', async (req : Request<{ uuid : string }>, res : Response, next : NextFunction) =>{
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;
    await userRepository.update(modifiedUser);

    res.status(StatusCodes.OK).send();
});

usersRouter.delete('/users/:uuid', async (req : Request<{ uuid : string }>, res : Response, next : NextFunction) =>{
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
});

export default usersRouter;