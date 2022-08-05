import prismaClient from './prisma-client.js';
import * as querybuilder from './querybuilders.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };

// export const getComment = async pageNum => {
//   const start = (pageNum - 1) * 5;
//   const query = `
//   SELECT *
//   FROM comment
//   ${start ? `LIMIT ${start},5` : `LIMIT 0 ,5`}`;
//   return query;
//   // return await prismaClient.$queryRawUnsafe
// };

export const createComment = async (boardId, userId, comment, parent_id) => {
  let cdepth;
  if (parent_id !== undefined) {
    let pdepth =
      await prismaClient.$queryRaw`SELECT cdepth FROM comment WHERE id=${parent_id}`;
    console.log(pdepth);
    cdepth = Number(pdepth[0].cdepth) + 1;
    console.log(cdepth);
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