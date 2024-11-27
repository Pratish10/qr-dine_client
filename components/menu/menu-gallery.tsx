import Image from 'next/image';
import { useState } from 'react';

interface MenuGalleryProps {
	images: string[];
	name: string;
}

export function MenuGallery({ images, name }: MenuGalleryProps): JSX.Element {
	const [selectedImage, setSelectedImage] = useState(images[0]);

	return (
		<div className='grid grid-cols-12 gap-4'>
			<div className='col-span-2 space-y-4'>
				{images.map((image, index) => (
					<div
						key={index}
						className={`border-2 rounded cursor-pointer transition-all ${
							selectedImage === image ? 'border-primary' : 'border-border hover:border-primary/50'
						}`}
						onClick={() => {
							setSelectedImage(image);
						}}
					>
						<Image
							src={image}
							alt={`${name} thumbnail ${index + 1}`}
							className='aspect-square object-cover rounded'
							width={80}
							height={80}
						/>
					</div>
				))}
			</div>
			<div className='col-span-10'>
				<div className='aspect-[4/3] relative rounded-lg overflow-hidden bg-secondary/10'>
					<Image src={selectedImage} alt={name} className='object-contain w-full h-full' fill />
				</div>
			</div>
		</div>
	);
}
