import * as models from '../models/board.js';

export const getBoard = async keyword => {
  const boardSearchResult = await models.getBoard(keyword);
  // const newDataList = [];
  // boardSearchResult.forEach(element => {
  //   newDataList.push(...Object.values(element));
  // });

  // const result = { dataList: newDataList };
  return boardSearchResult;
};

export const createComment = async (boardId, userId) => {
  return await models.createComment(boardId, userId);
};
