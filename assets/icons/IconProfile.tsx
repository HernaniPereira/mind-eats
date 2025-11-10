import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

const IconProfile = ({ size = 24, color = "#80E619" }: Props) => (
	<Svg width={size} height={size} fill="none">
		<G fill={color} clipPath="url(#a)">
			<Path d="M18 6A6 6 0 1 1 6 6a6 6 0 0 1 12 0ZM2 20a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1Z" />
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M0 0h24.001v24.001H0z" />
			</ClipPath>
		</Defs>
	</Svg>
);
export default IconProfile;
