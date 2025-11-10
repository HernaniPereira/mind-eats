import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

type Props = {
	size?: number;
	color?: string;
};

const IconHome = ({ size = 24, color = "#80E619" }: Props) => (
	<Svg width={size} height={24} fill="none">
		<G clipPath="url(#a)">
			<Path
				fill={color}
				d="M23 11.489v10.593a1.833 1.833 0 0 1-1.833 1.833h-4.583a1.834 1.834 0 0 1-1.833-1.833v-4.584a.917.917 0 0 0-.917-.916h-3.667a.917.917 0 0 0-.917.916v4.584a1.833 1.833 0 0 1-1.833 1.833H2.834A1.833 1.833 0 0 1 1 22.082V11.489a1.833 1.833 0 0 1 .593-1.35l9.166-8.649.013-.012a1.833 1.833 0 0 1 2.48.012l9.166 8.649a1.834 1.834 0 0 1 .582 1.35Z"
			/>
		</G>
		<Defs>
			<ClipPath id="a">
				<Path fill="#fff" d="M0 0h24v24H0z" />
			</ClipPath>
		</Defs>
	</Svg>
);
export default IconHome;
