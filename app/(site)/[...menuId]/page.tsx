'use client';
import { useGetMenu } from '@/hooks/menu/use-get-Menu';
import { menu, menuDetailStatus } from '@/recoil/menus/atom';
import { useRecoilValue } from 'recoil';
import { MenuGallery } from '@/components/menu/menu-gallery';
import { MenuInfo } from '@/components/menu/menu-info';
import { PurchaseCard } from '@/components/menu/purchase-card';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, staggerContainer } from '@/config/animations.config';
import { Separator } from '@/components/ui/separator';
import { MenuSkeleton } from '@/components/menu-skeleton';
import NotFound from '@/app/not-found';

interface MenuPageProps {
	params: { menuId: string };
}

const MenuPage = ({ params }: MenuPageProps): JSX.Element | null => {
	useGetMenu(params.menuId ?? '');
	const menDetailStatus = useRecoilValue(menuDetailStatus);
	const menuDetail = useRecoilValue(menu);

	if (menDetailStatus === 'loading') {
		return <MenuSkeleton />;
	}

	if (menuDetail === null) {
		return <NotFound />;
	}

	return (
		<motion.div
			variants={fadeIn}
			initial='hidden'
			animate='visible'
			className='min-h-screen bg-background text-foreground py-4 px-2 sm:py-6 sm:px-4'
		>
			<div className='container mx-auto max-w-5xl'>
				<div className='flex flex-col lg:flex-row gap-6'>
					<div className='w-full lg:w-1/2'>
						<div className='sticky top-4'>
							<MenuGallery images={menuDetail.image} name={menuDetail.name} />
						</div>
					</div>

					<div className='w-full lg:w-1/2 space-y-6'>
						<MenuInfo
							name={menuDetail.name}
							category={menuDetail.category}
							type={menuDetail.type}
							availability={menuDetail.availability}
							averageRating={menuDetail.averageRating ?? 0}
							menuId={menuDetail.menuId}
						/>

						<motion.div variants={staggerContainer} initial='hidden' animate='visible' className='space-y-6 dark:text-slate-300'>
							<motion.h2 variants={fadeIn} className='text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text'>
								About this dish
							</motion.h2>
							<Separator className='my-6' />
							<motion.div variants={staggerContainer} className='space-y-6 text-muted-foreground'>
								<motion.p variants={slideIn} className='leading-relaxed text-lg'>
									{menuDetail.description}
								</motion.p>
								<motion.ul variants={staggerContainer} className='space-y-3 list-none'>
									{['Made fresh upon order', 'Premium ingredients', "Chef's special recipe"].map((item, index) => (
										<motion.li key={index} variants={slideIn} className='flex items-center gap-2 text-sm'>
											<span className='w-2 h-2 rounded-full bg-primary/60' />
											{item}
										</motion.li>
									))}
								</motion.ul>
							</motion.div>
						</motion.div>

						<div className='lg:sticky lg:top-4'>
							<PurchaseCard menu={menuDetail} />
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default MenuPage;
