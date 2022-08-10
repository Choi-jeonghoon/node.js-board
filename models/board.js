import prismaClient from '../prisma/index.js';
import * as querybuilder from './querybuilders.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };

export const getBoardWithComment = async (boardId, pageNum) => {
  const start = (pageNum - 1) * 5;
  let end = Number(
    (
      await prismaClient.$queryRaw`SELECT COUNT(board_id) AS rowNum FROM comment WHERE board_id=${boardId}`
    )[0].rowNum
  );
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
        ORDER BY creatred_at ${start ? `LIMIT ${start}, ${end}` : `LIMIT 0,5`}
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

export const createComment = async (boardId, userId, comment, parent_id) => {
  let cdepth;
  if (parent_id !== undefined) {
    let pdepth =
      await prismaClient.$queryRaw`SELECT cdepth FROM comment WHERE id=${parent_id}`;

    cdepth = Number(pdepth[0].cdepth) + 1;
  } else {
    cdepth = 0;
  }
  const query = `
    INSERT INTO comment (
      board_id,
      user_id,
      comment
      ${parent_id ? `, parent_id, cdepth` : ``}) 
      VALUES (
        ${boardId},
        ${userId},
        "${comment}"
        ${parent_id ? `, ${parent_id}, ${cdepth}` : ``}
    );
  `;
  await prismaClient.$queryRawUnsafe(query);
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
