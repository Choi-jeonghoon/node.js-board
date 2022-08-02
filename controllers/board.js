import * as services from '../services/board.js';

export const getBoard = async (req, res) => {
  try {
    // const id = req.params.id;
    const data = await services.getBoard();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'FAIL' });
  }
};
