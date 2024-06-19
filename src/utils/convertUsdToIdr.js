const idr = 16200;

const convertUsdToIdr = (usd) => {
  const result = usd * idr;
  const formattedPrice = result.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formattedPrice;
};

export default convertUsdToIdr;
