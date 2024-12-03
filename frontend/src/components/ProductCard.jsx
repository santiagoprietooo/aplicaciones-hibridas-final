import React from "react";
import PriceFormatter from "./priceFormater";
import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const priceFormat = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS"
});

function ProductCard(props) {
    return(
        <NavLink to={`/product/${props.myId}`} className="relative">
            <button
                type="button"
                className="absolute top-3 right-3 z-10 p-2 bg-white border-2 border-transparent rounded-full"
            >
                <Heart className="size-5 text-transparent fill-neutral-400" />
            </button>

            <div className="flex flex-col items-center rounded-ss-lg rounded-se-lg overflow-hidden">
                <img
                    src={props.imgSrc}
                    alt={props.title}
                    className="w-ful p-5 bg-neutral-300 transform transition-transform duration-300 ease-in-out hover:scale-125"
                />
            </div>

            <div className="flex flex-col gap-2 p-4 border-x border-neutral-300 border-b rounded-es-lg rounded-ee-lg">
                <h2 className="text-lg hover:underline">
                    {props.title} {props.categoria} - {props.temporada}
                </h2>

                <p className="font-semibold">{PriceFormatter.format(props.precio)}</p>
            </div>
        </NavLink>
    )
}

export default ProductCard;