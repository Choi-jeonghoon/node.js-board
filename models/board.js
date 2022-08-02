import prismaClient from './prisma-client.js';

//ORM 작성시
// export const getBoard = async () => {
//   return await prismaClient.boards.get({});
// };

export const getBoard = async () => {
  return await prismaClient.$queryRaw`
    SELECT
    *
    FROM board
    `;
};
