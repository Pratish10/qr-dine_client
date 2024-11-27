import React from 'react';
import { Star } from 'lucide-react';
import { RATING_STAR } from '@/config/filter.config';

interface StarRatingProps {
	rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	return (
		<div className='flex items-center'>
			{RATING_STAR.map((star) => (
				<Star key={star} size={16} className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
			))}
		</div>
	);
};
