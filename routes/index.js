import express from 'express';
import boardRouter from './board.js';
import { specs, swaggerUi } from '../modules/swagger.js';

const router = express.Router();
router.use(boardRouter);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//API 명세서
/**
 * @swagger
 * paths:
 *  /board:
 *    get:
 *      tags:
 *      - board
 *      description: 게시판 검색
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: false
 *          schema:
 *            type: integer
 *            description: 게시판
 *      responses:
 *       200:
 *        description: 게시판 검색
 *
 *  /board/{id}:
 *    post:
 *      tags:
 *      - board
 *      description: 게시판 댓글 등록
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: ture
 *          type: integer
 *          description: 게시판 댓글 등록
 *
 *        - in: body
 *          name: createComment
 *          required: ture
 *          schema:
 *             $ref: "#/definitions/comment"
 *      responses:
 *       200:
 *        description: 게시판 검색
 *    put:
 *      tags:
 *      - board
 *      description: 게시판 조회수
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: ture
 *          type: integer
 *          description: 게시판 조회수
 *
 *        - in: body
 *          name: createComment
 *          required: ture
 *          properties:
 *            userId:
 *                type: integer
 *                description: user Id 가져오기
 *                example: 1
 *      responses:
 *       200:
 *        description: 게시판 조회수
 * definitions:
 *  comment:
 *      type : object
 *      required:
 *          userId
 *      properties:
 *          userId:
 *              type: integer
 *              description: user Id 가져오기
 *              example: 1
 *          comment:
 *              type: string
 *              description: 코멘트 내용 입력
 *              example: "안녕"
 *          parent_id:
 *               type: integer
 *               description: 대댓글일 때만 작성,첫번쨰 댓글일때만 삭제
 *               example: 1
 *
 *
 *
 */
export default router;
