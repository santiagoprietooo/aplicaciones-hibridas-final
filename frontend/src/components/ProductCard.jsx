import React from "react";
import PriceFormatter from "./PriceFormater";
import { Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

function ProductCard(props) {
    return(
        <NavLink to={props.route} className="relative">
            <button
                type="button"
                className="absolute top-3 right-3 z-10 p-2 bg-neutral-400 border-2 border-transparent rounded-full transition-colors hover:bg-neutral-500"
            >
                <Heart className="size-5 text-transparent fill-white" />
            </button>

            <div className="flex flex-col items-center w-full border border-neutral-200 rounded-ss-lg rounded-se-lg overflow-hidden">
                <div
                className="h-96 w-full bg-contain bg-no-repeat bg-center transform transition-transform duration-300 ease-in-out hover:scale-125"
                style={{ backgroundImage : `url(${props.imgSrc})` }}></div>
            </div>

            <div className="flex flex-col gap-2 p-4 border-x border-neutral-200 border-b rounded-es-lg rounded-ee-lg">
                <h2 className="text-lg hover:underline">
                    {props.title} {props.categoria} - {props.temporada} - {props.color}
                </h2>

                <p className="font-semibold">{PriceFormatter.format(props.precio)}</p>
            </div>
        </NavLink>
    )
}

export default ProductCard;