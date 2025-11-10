import React from "react";
import Svg, { G, Mask, Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

export const IconSearch = ({ size = 24, color = "#80E619" }: Props) => (
	<Svg width={16} height={16} fill="none">
		<Mask
			id="a"
			width={16}
			height={16}
			x={0}
			y={0}
			maskUnits="userSpaceOnUse"
			style={{
				maskType: "alpha",
			}}
		>
			<Path
				fill="#80E619"
				fillRule="evenodd"
				d="M6.427.333C3.064.333.333 3.038.333 6.38c0 3.341 2.731 6.046 6.094 6.046a6.1 6.1 0 0 0 3.39-1.021l3.975 3.943a1.103 1.103 0 0 0 1.552 0c.43-.427.43-1.12 0-1.548l-3.95-3.917A5.988 5.988 0 0 0 12.52 6.38C12.52 3.038 9.79.333 6.427.333ZM2.531 6.38c0-2.13 1.742-3.861 3.896-3.861s3.896 1.73 3.896 3.86-1.742 3.862-3.896 3.862S2.531 8.509 2.531 6.38Z"
				clipRule="evenodd"
			/>
		</Mask>
		<G mask="url(#a)">
			<Path fill="#262824" d="M0 0h16v16H0z" />
		</G>
	</Svg>
);
