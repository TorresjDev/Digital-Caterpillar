"use client";

import { useState } from "react";

const NavItems = () => {
	const [activeIndex, setActiveIndex] = useState<null | number>(null);

	return (
		<div className="flex gap-4 h-full">
			<p>Hello World</p>
		</div>
	);
};

export default NavItems;
