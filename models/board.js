import prismaClient from './prisma-client.js';
import * as querybuilder from './querybuilders.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };
export const getBoard = async keyword => {
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
  console.log('parent_id: ', parent_id);
  let cdepth = 0;
  if (parent_id !== null) {
    cdepth = Number(parent_id) + 1;
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
