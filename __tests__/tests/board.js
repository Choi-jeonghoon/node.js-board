import * as boardServices from '../../services/board.js';
import { describe, expect, test } from '@jest/globals';

describe(' Get board ', () => {
  beforeAll(async () => {
    /* 모든 test() 함수 실행 이전에 작동한다. */
  });

  test('SUCCESS : searchBoard - 채용이라고 검색할 시', async () => {
    const req = {
      keyword: '채용',
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    let keyword = '채용';
    const board = await boardServices.getBoards(keyword);
    expect(board.length).toBe(4);
  });

  afterAll(async () => {
    /* 모든 test() 함수 실행 이전에 작동한다. */
  });
});
