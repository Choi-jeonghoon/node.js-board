import express from 'express';
import * as controller from '../controllers/board.js';
const router = express.Router();

router.get('/board/:boardId', controller.getBoard); // 원하는 게시판 조회
router.get('/boards/', controller.getBoards); //게시판 검색
router.put('/board/:boardId', controller.updateBoardViews); //게시판 조회수

router.post('/comment/:boardId', controller.createComment); //댓글 작성

router.get('/comment', controller.readComment);//댓글 페이징
export default router;
