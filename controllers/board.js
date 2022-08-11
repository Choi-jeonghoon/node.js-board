import { boardServices } from '../services/index.js';

export const getBoardWithComment = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const pageNum = req.query.page;
    const boardSearchResult = await boardServices.getBoardWithComment(
      boardId,
      pageNum
    );
    return res.status(200).json(boardSearchResult);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getBoards = async (req, res) => {
  try {
    const { keyword } = req.query;
    const boardSearchResult = await boardServices.getBoards(keyword);
    if (boardSearchResult.count === 0 || keyword == '') {
      return res.sendStatus(204);
    }
    return res.status(200).json(boardSearchResult);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const increaseView = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const { userId } = req.body;
    const view = await services.increaseView(boardId, userId);
    return res.status(200).json(view);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: 'err.message ' });
  }
};
