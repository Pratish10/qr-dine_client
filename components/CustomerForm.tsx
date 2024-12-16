/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAddCustomer } from '@/hooks/customers/use-add-customers';
import { toast } from 'sonner';
import { cart } from '@/recoil/cart/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RATING_STAR } from '@/config/filter.config';
import { Loader2, Star } from 'lucide-react';
import { Button } from './ui/button';
import { customer } from '@/recoil/customer/atom';
import { type Customer } from '@/types/data.types';

interface CustomerFormProps {
	setIsPlaceOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomerForm = ({ setIsPlaceOrder }: CustomerFormProps): JSX.Element => {
	const cartItems = useRecoilValue(cart);
	const setCustomer = useSetRecoilState(customer);
	const [email, setEmail] = useState('');
	const [name, setName] = useState<string>('');
	const [ratings, setRatings] = useState<Array<{ menuId: string; rating: number }>>([]);
	const [emailError, setEmailError] = useState<string>('');
	const [nameError, setNameError] = useState<string>('');
	const { mutate, isPending } = useAddCustomer();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setEmail(e.target.value);
		if (e.target.value.trim() !== '') {
			setEmailError('');
		}
	};
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setName(e.target.value);
		if (e.target.value.trim() !== '') {
			setNameError('');
		}
	};

	const handleRatingChange = (menuId: string, rating: number): void => {
		setRatings((prevRatings) => {
			const existingRatingIndex = prevRatings.findIndex((rating) => rating.menuId === menuId);

			if (existingRatingIndex !== -1) {
				const updatedRatings = [...prevRatings];
				updatedRatings[existingRatingIndex] = { menuId, rating };
				return updatedRatings;
			} else {
				return [...prevRatings, { menuId, rating }];
			}
		});
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		if (!email || email.trim() === '') {
			setEmailError('Email is required');
			return;
		}
		if (!name || name.trim() === '') {
			setNameError('Name is required');
			return;
		}

		mutate(
			{ email, ratings, name },
			{
				onSuccess: (data) => {
					if (data?.status) {
						setCustomer(data.data?.customer as Customer);
						setIsPlaceOrder(false);
						toast.success(data.message);
					} else {
						toast.error(data.message);
					}
				},

				onError: (error: any) => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					toast.error(error.response.data.message ?? error.message);
				},
			}
		);
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div className='dark:text-slate-300'>
				<Label htmlFor='name'>Your Name</Label>
				<Input type='text' id='name' value={name} onChange={handleNameChange} />
				{emailError && <span className='text-sm text-red-500'>{nameError}</span>}
			</div>
			<div className='dark:text-slate-300'>
				<Label htmlFor='email'>Please Enter your Email</Label>
				<Input type='email' id='email' value={email} onChange={handleEmailChange} />
				{emailError && <span className='text-sm text-red-500'>{emailError}</span>}
				<span className='text-sm text-neutral-400'>Order receipt will be shared over your email</span>
			</div>
			<div>
				<h3 className='text-lg font-medium mb-2 dark:text-slate-300'>Please Rate the food</h3>
				{cartItems.map((item) => (
					<div key={item.id} className='flex items-center justify-between mb-2 text-sm'>
						<span className='dark:text-slate-300'>{item.name}</span>
						<div className='flex items-center'>
							{RATING_STAR.map((star) => (
								<Star
									key={star}
									size={24}
									className={`${
										star <= (ratings?.find((r) => r.menuId === item.id)?.rating ?? 0)
											? 'text-yellow-400 fill-yellow-400'
											: 'text-gray-300'
									} cursor-pointer transition-colors duration-150 hover:text-yellow-400`}
									onClick={() => {
										handleRatingChange(item.id, star);
									}}
									role='button'
									tabIndex={0}
									aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
									id={item.id !== '' ? `rating-${item.id}-star-${star}` : undefined}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<Button type='submit' className='w-full' variant='green' disabled={isPending}>
				{isPending ? <Loader2 className='h-6 w-6 animate-spin' /> : 'Submit'}
			</Button>
		</form>
	);
};
