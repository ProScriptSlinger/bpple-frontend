export const editRequestById = (items, data, setData) => {
  const updatedItems = items.map((item) => {
    if (item.requestId === data.requestId) {
      return { ...item, ...data };
    }
    return item;
  });

  console.log(updatedItems);

  setData(updatedItems);
};
