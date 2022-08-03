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
export const getBoardViews = async boardId => {
  return await prismaClient.$queryRaw`
  SELECT 
  board_views
  FROM board
  WHERE id = ${boardId};
  `;
};

export const updateBoardViews = async (boardId, userId) => {
  let boardViews = (await getBoardViews(boardId))[0].board_views + 1;

  return await prismaClient.$queryRaw`
  UPDATE board SET board_views = ${boardViews} WHERE id=${boardId};
  `;
};
