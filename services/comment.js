import * as models from '../models/comment.js';



// export const readComment = async pageNum => {
//   const readCommentResult = await models.getComment(pageNum);
//   return readCommentResult;
// };

export const createComment = async (boardId, userId, comment, parent_id) => {
  return await models.createComment(boardId, userId, comment, parent_id);
};
