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
