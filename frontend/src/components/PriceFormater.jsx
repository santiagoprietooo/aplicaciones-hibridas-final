const PriceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
});

export default PriceFormatter;