import * as boardModels from '../models/board.js';

export const getBoardWithComment = async (boardId, pageNum) => {
  const boardSearchResult = await boardModels.getBoardWithComment(
    boardId,
    pageNum
  );
  return boardSearchResult;
};

export const getBoards = async keyword => {
  const boardSearchResult = await boardModels.getBoards(keyword);
  return boardSearchResult;
};

export const updateBoardViews = async (boardId, userId) => {
  const existingUser = await boardModels.getUserById(boardId, userId);
  if (existingUser) {
    const view = Number((await boardModels.readView(boardId))[0].cnt);
    return view;
  }
  await boardModels.updateBoardViews(boardId, userId);
  const view = Number((await boardModels.readView(boardId))[0].cnt);
  return view;
};
