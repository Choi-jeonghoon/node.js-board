import { commentModels } from '../models/index.js';

export const createComment = async (boardId, userId, comment, parent_id) => {
  return await commentModels.createComment(boardId, userId, comment, parent_id);
};

// export const readComment = async pageNum => {
//   const readCommentResult = await models.getComment(pageNum);
//   return readCommentResult;
// };
