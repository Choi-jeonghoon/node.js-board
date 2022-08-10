// API 명세서
/**
 * @swagger
 * paths:
 *  /boards:
 *    get:
 *      summary: 게시판 조회(Keyword로 검색)
 *      tags:
 *      - board
 *      description: 게시판 검색 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: keyword
 *          required: false
 *          type: string
 *          description: 게시판
 *      responses:
 *       200:
 *        description: 검색 결과 DATA
 *
 *  /board/{id}:
 *    get:
 *      summary: 게시판 조회(한개에 대한 게시판 조회)
 *      tags:
 *      - board
 *      description: 한개 대한 게시판을 조회시 게시판에 있는 댓글을 페이지네이션으로 page 수 지정해서 보여준다.
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
 *        description: 검색 결과 DATA
 *
 *    put:
 *      summary: 게시판 조회수 조회
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
 *        description: 조회수 DATA
 *
 *  /comment/{id}:
 *    post:
 *      summary: 댓글 등록
 *      tags:
 *      - comment
 *      description: 댓글 등록(대댓글을 무한댓글로 등록이 가능하다)
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
 *        description: 검색 결과 DATA
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
