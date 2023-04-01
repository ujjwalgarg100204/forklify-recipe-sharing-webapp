import { NextFunction, Request, Response } from "express";

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	req.user ? next() : res.redirect("/auth/login");
}
