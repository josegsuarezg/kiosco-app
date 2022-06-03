export const formatMoney = (value) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    })
};
