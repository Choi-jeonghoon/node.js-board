import prismaClient from './prisma-client.js';
import * as querybuilder from './querybuilders.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };

export const getBoard = async keyword => {
  return await prismaClient.$queryRawUnsafe(`
  SELECT
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
    ) AS c ON c.board_id=board.id

  LEFT JOIN category ON category.id=board.category_id

  WHERE ${querybuilder.searchFilter(keyword)}
  `);
};

export const createComment = async (boardId, userId) => {
  return await prismaClient.$queryRawUnsafe(`
  INSERT INTO comment(user_id,board_id,comment,cgroup) VALUES(${userId},${boardId},${comment},${cgroup});
  `);
};
