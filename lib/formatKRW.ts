export function formatKRW(value: number) {
  return (
    value
      .toLocaleString("ko-KR", {
        style: "currency",
        currency: "KRW",
        maximumFractionDigits: 0,
      })
      .replace("₩", "") + "원"
  );
}
