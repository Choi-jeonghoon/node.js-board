import prismaClient from '../prisma/index.js';
import * as querybuilder from './querybuilders.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };
export const getBoardByBoardId = async boardId => {
  const [existingBoard] = await prismaClient.$queryRaw`
    SELECT * FROM board
    WHERE id=${boardId}
  `;
  return existingBoard;
};

export const getBoardWithComment = async (
  boardId,
  commentOffset,
  commentLimit
) => {
  const start = (commentOffset - 1) * commentLimit;

  return await prismaClient.$queryRawUnsafe(`
  SELECT
    b.id,
    b.user_id,
    user.nick_name,
    b.board_title,
    b.board_contents,
    (
      SELECT

      JSON_ARRAYAGG(JSON_OBJECT("parent_id",cc.parent_id,"nick_name",uu.nick_name,"comment",cc.comment)) AS comt
      
      FROM (
        SELECT
        *
        FROM comment
        ORDER BY creatred_at  
        ${
          start ? `LIMIT ${start}, ${commentLimit}` : `LIMIT 0, ${commentLimit}`
        }
        ) AS cc
      LEFT JOIN user AS uu ON cc.user_id=uu.id
      WHERE cc.board_id=${boardId}
    ) AS board_comment
  FROM board AS b
  LEFT JOIN (
    SELECT
    *
    FROM comment
    ) AS c ON b.id = c.board_id

  LEFT JOIN user AS u ON c.user_id = u.id
  LEFT JOIN user ON b.user_id = user.id

  WHERE b.id= ${boardId}

  GROUP BY b.id
  `);
};

export const getBoards = async keyword => {
  return await prismaClient.$queryRawUnsafe(`
  SELECT
    board.id,
    board.board_title AS boardTitle,
    board.board_contents AS boardContent,
    user.nick_name AS userName,
    c.commentComment,
    category.category

  FROM board
    LEFT JOIN user ON board.user_id=user.id
    LEFT JOIN (
      SELECT
        comment.board_id,
        JSON_ARRAYAGG(user.nick_name) AS userCommentNickname,
        JSON_ARRAYAGG(comment.comment) AS commentComment

      FROM comment
        JOIN user on user.id=comment.user_id
      GROUP BY comment.board_id    
    ) AS c ON c.board_id = board.id

  LEFT JOIN category ON category.id=board.category_id

  WHERE ${querybuilder.searchFilter(keyword)}
  `);
};

export const getUserById = async (boardId, userId) => {
  const [existingUser] = await prismaClient.$queryRaw`
  SELECT * FROM view WHERE board_id=${boardId} AND user_id= ${userId}
  `;
  return existingUser;
};

export const updateBoardViews = async (boardId, userId) => {
  return await prismaClient.$queryRaw`
  INSERT INTO view (board_id,user_id) VALUES(${boardId},${userId})
  `;
};

export const readView = async boardId => {
  return await prismaClient.$queryRaw`
  SELECT COUNT(*) AS cnt FROM view WHERE board_id=${boardId}
  `;
};

// export const getComment = async pageNum => {
//   const start = (pageNum - 1) * 5;
//   const query = `
//   SELECT *
//   FROM comment
//   ${start ? `LIMIT ${start},5` : `LIMIT 0 ,5`}`;
//   return query;
//   // return await prismaClient.$queryRawUnsafe
// };
