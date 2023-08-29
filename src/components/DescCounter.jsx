/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

function DescCounter({ ...props }) {
	const maximumText = 255;
	const [textCounter, setTextCounter] = useState(maximumText);

	const handleCount = () => {
		const currentTextCount = maximumText - props.desc.length;
		if (currentTextCount > -1) {
			setTextCounter(currentTextCount);
		}
	};

	useEffect(() => {
		handleCount();
	}, [props.desc]);
	return (
		<div className='absolute border border-zinc-100 px-2 py-1 rounded-md shadow-xl md:top-[380px] right-12 xl:top-[345px]'>
			<h1
				className={`${
					textCounter > 50
						? "text-green-500"
						: textCounter >= 11 && textCounter < 50
						? "text-yellow-500"
						: "text-red-500"
				}`}>
				{textCounter}
			</h1>
		</div>
	);
}

export default DescCounter;
