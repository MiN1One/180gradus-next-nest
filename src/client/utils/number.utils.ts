export const getLimintNumber = (num: number, limit: number) => {
  return (
    num > 0 ? Math.min(num, limit) : Math.max(num, -limit)
  );
};