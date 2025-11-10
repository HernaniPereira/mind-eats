import React from "react";
import Svg, { ClipPath, Defs, G, Mask, Path } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

export const IconLeftArrow = ({ size = 24, color = "#80E619" }: Props) => (
	<Svg width={size} height={size} fill="none">
		<G
			stroke="#80E619"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={3}
			clipPath="url(#a)"
		>
			<Path d="M20.998 12h-18 .5M9.998 19l-7-7 7-7" />
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M0 0h24.001v24.001H0z" />
			</ClipPath>
		</Defs>
	</Svg>
);
