'use client';

import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

export const ScanQRPrompt = (): JSX.Element => {
	return (
		<div className='flex items-center justify-center min-h-[calc(100vh-56px)] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full'
			>
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
					className='flex justify-center mb-6'
				>
					<QrCode size={64} className='text-green-500 dark:text-green-400' />
				</motion.div>
				<motion.h2
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
					className='text-2xl font-bold text-center text-green-700 dark:text-green-300 mb-4'
				>
					Please Scan the QR Code
				</motion.h2>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
					className='text-green-600 dark:text-green-400 text-center'
				>
					To access the menu, scan the QR code located on your table.
				</motion.p>
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className='mt-6 h-1 bg-green-300 dark:bg-green-600 rounded'
				/>
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
					className='mt-4 text-sm text-green-500 dark:text-green-400 text-center'
				>
					Need help? Ask our staff for assistance.
				</motion.p>
			</motion.div>
		</div>
	);
};
