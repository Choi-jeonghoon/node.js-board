# BoradAPI

## 사용 기술스택

### JavaScript

### Express

### mysqlDB

## 실행방법

### 1.해당 레포지토리를 clone합니다.

```shell
git clone https://github.com/Choi-jeonghoon/JH_board
```

### 2. 다운 받으신 폴더로 들어갑니다

```shell
cd JH_board
```

### 3. 의존성들을 설치합니다.

```shell
npm i
```

### 4. Swagger 문서를 build합니다

```shell
npm run api-docs
```

### 5. 실행시킵니다!

```shell
npm start
```

## API 명세서

```shell
http://localhost:10010/api-docs/
```

에서 확인하실수 있습니다.

<img width="1243" alt="스크린샷 2022-08-05 오후 4 34 12" src="https://user-images.githubusercontent.com/68211978/183027076-77d2740e-a4e1-4de9-9fb8-c4791f08ce1d.png">

- Justcode 기업 과제 내용 포함
- 해당 프로젝트는 [링크]https://community.wecode.co.kr/ 의 프로젝트 기반으로 만들었습니다.
- 게시글 카테고리가 있습니다.

- 게시글 검색 기능이 있습니다.
  - 게시글에서 특정 키워드를 검색하면, 게시글 제목, 게시글 본문, 게시글 댓글, 게시글 작성자 이름 에서 모두 검색하여, 해당 게시물을 표출합니다.
  - ex) `노드` 를 검색
- 대댓글(1 depth)
  - 댓글에는 대댓글을 달 수 있습니다.
  - 1 depth는 필수이지만, 2, 3중으로 대댓글을 계속해서 추가할 수 있다면 가산점이 있습니다.
  - 댓글/대댓글 pagination
- 게시글 읽힘 수
  - 같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됩니다.
- Restful API 규칙에 따라 설계합니다.
- Unit Test 를 추가합니다.
- 1000만건 이상의 데이터를 넣고 성능테스트 진행 결과 필요합니다.

# 기능 설명

- 게시글 검색

  - GET /boards API 를 사용해서 검색가능합니다.또한 keyWord는 자유작성이 가능합니다. 게시글 제목, 카테고리, 본문, 작성자 ,댓글 을 포함한 데이터는 모두 검색의 결과로서 나타납니다.

  - 아래는 검색 부분의 구현한 코드입니다.

```javascript
SELECT
    board.id,
    board.board_title AS boardTitle,
    board.board_contents AS boardContent,
    user.nick_name AS userName,
    c.commentComment,
    category.category

  FROM board
    LEFT JOIN user ON board.user_id=user.id
    LEFT JOIN (
      SELECT
        comment.board_id,
        JSON_ARRAYAGG(user.nick_name) AS userCommentNickname,
        JSON_ARRAYAGG(comment.comment) AS commentComment

      FROM comment
        JOIN user on user.id=comment.user_id
      GROUP BY comment.board_id
    ) AS c ON c.board_id = board.id

  LEFT JOIN category ON category.id=board.category_id

  WHERE ${querybuilder.searchFilter(keyword)}
```

- 아래는keyWodrd 부분의 구현한 코드입니다.

```javascript
export const searchFilter = keyword => {
  const searchColumn = [
    'board_title',
    'nick_name',
    'board_contents',
    'commentComment',
  ];
  const conditions = searchColumn.map(
    column => `${column} LIKE '%${keyword}%'`
  );
  return `(${conditions.join(' OR ')})`;
};
```

- 댓글 등록
  - GET /comment/:boardId API 를 사용하여 게시글에 댓글이 등록하고 댓글에 댓글을 등록하는 것을 확인 할 수 있습니다.
  - 아래의 코드는 댓글에 대댓글을 등록할수 있도록 구현한 코드입니다.

```javascript
export const createComment = async (boardId, userId, comment, parent_id) => {
  let cdepth;
  if (parent_id !== undefined) {
    let pdepth =
      await prismaClient.$queryRaw`SELECT cdepth FROM comment WHERE id=${parent_id}`;
    cdepth = Number(pdepth[0].cdepth) + 1;
  } else {
    cdepth = 0;
  }
  const query = `
    INSERT INTO comment (
      board_id,
      user_id,
      comment
      ${parent_id ? `, parent_id, cdepth` : ``})
      VALUES (
        ${boardId},
        ${userId},
        "${comment}"
        ${parent_id ? `, ${parent_id}, ${cdepth}` : ``}
    );
  `;
  await prismaClient.$queryRawUnsafe(query);
```

- 대댓글(1 depth)

  - 대댓글 pagination
  - 기본 댓글은 0 depth, 대댓글은 1의 depth를 가지고있습니다. 대댓글의 페이지네이션은 GET /board/:id?page에서 확인하실수 있습니다.

  - 아래 코드는 대댓글 apgination 을 적용한 게시판을 조회했을 때 코드입니다.

  ```javascript
  const start = (pageNum - 1) * 5;

  let end = Number(
    (
      await prismaClient.$queryRaw`SELECT COUNT(board_id) AS rowNum FROM comment WHERE board_id=${boardId}`
    )[0].rowNum
  );
  return await prismaClient.$queryRawUnsafe(`
  SELECT
    b.id,
    b.user_id,
    user.nick_name,
    b.board_title,
    b.board_contents,
    (
      SELECT

      JSON_ARRAYAGG(JSON_OBJECT("parent_id",cc.parent_id,"nick_name",uu.nick_name,"comment",cc.comment)) AS comt

      FROM (
        SELECT
        *
        FROM comment
        ORDER BY creatred_at ${start ? `LIMIT ${start}, ${end}` : `LIMIT 0,5`}
        ) AS cc
      LEFT JOIN user AS uu ON cc.user_id=uu.id
      WHERE cc.board_id=${boardId}
    ) AS board_comment
  FROM board AS b
  LEFT JOIN (
    SELECT
    *
    FROM comment
    ) AS c ON b.id = c.board_id

  LEFT JOIN user AS u ON c.user_id = u.id
  LEFT JOIN user ON b.user_id = user.id

  WHERE b.id= ${boardId}

  GROUP BY b.id

  ```

- 게시글 읽힘 수
  - 같은 User가 게시글을 읽는 경우 count 수 증가되지 않도록 설계하였습니다.
  - 아래 코드는 user 가 게시글을 읽었을때는 1번 이후로는 조회수가 오르지 않게 하였습니다.

```javascript
export const getUserById = async (boardId, userId) => {
  const [existingUser] = await prismaClient.$queryRaw`
  SELECT * FROM view WHERE board_id=${boardId} AND user_id= ${userId}
  `;
  return existingUser;
};

export const updateBoardViews = async (boardId, userId) => {
  return await prismaClient.$queryRaw`
  INSERT INTO view (board_id,user_id) VALUES(${boardId},${userId})
  `;
};
```

## 개발 요구사항에 대한 성공여부

- 게시글 검색 기능이 설계하였습니다.
- 댓글에는 대댓글을 달 수 있도록 설계하였습니다.(2중 3중으로 대댓글을 추가할수있습니다.)
- 같은 User가 게시글을 읽는 경우 count 수 증가되지 않도록 설계하였습니다.
- Rest API 설계

  - Rest API를 이용하여 설계하였습니다.

- Unit Test
  - Unit Test는 진행하지 못했습니다.
- 1000만건 이상의 데이터를 넣고 성능테스트 진행 못했습니다.
