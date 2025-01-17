declare module 'lucide-react' {
	import { FC, SVGProps } from 'react';

	export interface IconProps extends SVGProps<SVGSVGElement> {
		size?: number | string;
		color?: string;
		strokeWidth?: number | string;
	}

	export type Icon = FC<IconProps>;

	export const Search: Icon;
	export const ArrowRight: Icon;
	export const TrendingUp: Icon;
	export const Clock: Icon;
	export const Loader2: Icon;
}