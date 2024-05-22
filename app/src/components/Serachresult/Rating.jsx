
import { useState } from "react";
import styled from "styled-components";
export default function Rating() {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    return (
        <StarRating>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <>
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star"> &#9733;</span>

                        </button>

                    </>
                );
            })}
            <p>10 ratings</p>
        </StarRating>
    );
}
const StarRating=styled.section`
button {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.on {
  color: #000;
}
.off {
  color: #ccc;
}`;


