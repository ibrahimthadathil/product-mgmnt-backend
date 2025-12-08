import { auth_Controller } from "@/controller/implementation/authController";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/signup", auth_Controller.Signup.bind(auth_Controller));
authRoute.post("/signin", auth_Controller.SignIn.bind(auth_Controller));
authRoute.post("/refresh", auth_Controller.setNewToken.bind(auth_Controller));

export default authRoute;
