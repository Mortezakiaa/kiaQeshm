export const sp = (number: number | null) => {
  const seperatedNumber = number
    ?.toString()
    ?.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return joinedNumber;
};
