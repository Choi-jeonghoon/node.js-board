import express from 'express';
import * as commentController from '../controllers/comment.js';
const router = express.Router();

router.post('/comment/:boardId', commentController.createComment); //댓글 작성

// router.get('/comment', commentcontroller.readComment);//댓글 페이징
export default router;
