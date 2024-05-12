export const sp = (number: number | null) => {
  const seperatedNumber = number
    ?.toString()
    ?.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return joinedNumber;
};

export const p2e = (s: any) =>
  s.toString().replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
