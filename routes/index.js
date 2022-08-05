import express from 'express';
import boardRouter from './board.js';
import { specs, swaggerUi } from '../modules/swagger.js';

const router = express.Router();
router.use(boardRouter);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// API 명세서
/**
 * @swagger
 * paths:
 *  /boards:
 *    get:
 *      tags:
 *      - board
 *      description: 게시판 검색 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: false
 *          type: integer
 *          description: 게시판
 *      responses:
 *       200:
 *        description: 검색 결과
 *
 *  /board/{id}:
 *    get:
 *      tags:
 *      - board
 *      description: 게시판 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          description : "boardId"
 *
 *        - in: query
 *          name: page
 *          required: true
 *          type: integer
 *          description : "댓글 pagination page number"
 *      responses:
 *       200:
 *        description: 검색 결과
 *
 *    put:
 *      tags:
 *      - board
 *      description: 조회수 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          description : "boardId"
 *
 *        - in: body
 *          name: userId
 *          required: true
 *          type: integer
 *          properties:
 *              userId:
 *                  type: integer
 *                  example: 1
 *      responses:
 *       200:
 *        description: 조회수
 *
 *  /comment/{id}:
 *    post:
 *      tags:
 *      - comment
 *      description: 댓글 등록
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          type: integer
 *          description : "boardId"
 *
 *        - in: body
 *          name: createCommentDto
 *          required: ture
 *          schema:
 *              $ref: "#/definitions/comment"
 *      responses:
 *       200:
 *        description: 검색 결과
 *
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
 *          parentId:
 *               type: integer
 *               description: 대댓글일때만 작성하고, 첫번째 댓글일 경우에는 삭제
 *               example: 1
 */
export default router;
