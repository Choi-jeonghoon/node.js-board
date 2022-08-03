import * as services from '../services/board.js';

export const getBoard = async (req, res) => {
  try {
    const { keyword } = req.query;
    const boardSearchResult = await services.getBoard(keyword);
    if (boardSearchResult.count === 0 || keyword == '') {
      return res.sendStatus(204);
    }
    return res.status(200).json(boardSearchResult);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { userId, comment, parent_id } = req.body; //parent_id는 1부터 시작
    const boardComment = await services.createComment(
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

export const updateBoardViews = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { userId } = req.body;
    await services.updateBoardViews(boardId, userId);
    return res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
