import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
	rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	return (
		<div className='flex items-center'>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star key={star} size={16} className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
			))}
		</div>
	);
};
