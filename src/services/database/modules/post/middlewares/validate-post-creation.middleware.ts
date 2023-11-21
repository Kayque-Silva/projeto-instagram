import { NextFunction, Request, Response } from "express";


export const validatePostCreationMiddleware = async( req: Request, res: Response, next: NextFunction ) => {
    const { title, image_url } = req.body;

    if(!title) {
        return res.status(400).json({ ok: false, message: "Title is required" });
    }

    if(!image_url) {
        return res.status(400).json({ ok: false, message: "Image_url is required" });
    }

    next();
}