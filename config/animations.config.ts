import { type Variants } from 'framer-motion';

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const slideIn: Variants = {
	hidden: { x: 20, opacity: 0 },
	visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
	hidden: { scale: 0.9, opacity: 0 },
	visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};
