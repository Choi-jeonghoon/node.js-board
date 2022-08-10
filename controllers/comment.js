import { commentServices } from '../services/index.js';

export const createComment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { userId, comment, parent_id } = req.body; //parent_id는 1부터 시작
    const boardComment = await commentServices.createComment(
      boardId,
      userId,
      comment,
      parent_id
    );
    return res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// export const readComment = async (req, res) => {
//   try {
//     const pageNum = req.query.page;
//     const readCommentResult = await commentservices.readComment(pageNum);

//     return res.status(200).json(readCommentResult);
//   } catch (err) {
//     res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };
