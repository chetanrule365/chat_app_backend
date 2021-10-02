import express from "express";
import verifyToken from "../components/verifyToken";

const router = express.Router();

router.get("/home", verifyToken, (req: any, res) => {
    res.json({
        posts: "posts",
        user: req.user,
    });
});

export default router;
