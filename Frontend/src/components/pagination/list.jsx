import React from "react";

import ProdCard from "./Card";
import "./List.css";

const prodList = ({ data }) => {
    return (
        <div className='prod_list'>
            {data.map((data, index) => {
                return (
                    <ProdCard
                        key={index}
                        id={data._id}
                        img={data.prod_img}
                        name={data.prod_name}
                        desc={data.prod_desc}
                        price={data.prod_price}
                        brand={data.prod_brand}
                        type={data.prod_type}
                        pack={data.prod_pack}
                    />
                );
            })}
        </div>
    );
}

export default prodList;
