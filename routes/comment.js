import express from 'express';
import * as controller from '../controllers/comment.js';
const router = express.Router();

router.post('/comment/:boardId', controller.createComment); //댓글 작성

// router.get('/comment', controller.readComment);//댓글 페이징
export default router;
