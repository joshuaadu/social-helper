import { Router } from "express";
import authRoutes, { authCheck } from "./auth";

const router = Router();

router.use("/auth", authRoutes);
router.get("/home", authCheck, (req, res) => {
  res.send("Social helper home page");
});

export default router;
