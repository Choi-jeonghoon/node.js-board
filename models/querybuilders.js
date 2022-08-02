export const searchFilter = keyword => {
  console.log(keyword);
  const searchColumn = [
    'board_title',
    'nick_name',
    'board_contents',
    'commentComment',
  ];
  const conditions = searchColumn.map(
    column => `${column} LIKE '%${keyword}%'`
  );
  console.log(conditions, 'sasdasd');
  return `(${conditions.join(' OR ')})`;
};

