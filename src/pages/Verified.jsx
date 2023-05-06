import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import TopLoadingBar from "react-top-loading-bar";

import gray from "../assets/parago_gray.png";

function Verified({ props }) {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		setProgress(30);
		setTimeout(setProgress(100), 2000);
	}, []);

	return (
		<div className='font-primary'>
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex flex-row'>
				<div className='w-4/12 h-full bg-[#E8E8E8]'>
					<div className='m-10'>
						<h1>Step 2 out of 3</h1>
						<div className='flex flex-row'>
							<div className='w-2/12 bg-primary h-4'></div>
							<div className='w-2/12 bg-primary h-4'></div>
							<div className='w-2/12 bg-[#BEBEBE] h-4'></div>
						</div>
						<div className='flex flex-col gap-4 mt-40'>
							<img
								src={gray}
								alt='Parago Logo'
								className='w-7/12'
							/>
							<h1 className='font-bold text-primary text-4xl'>
								EMAIL VALIDATION
							</h1>
							<p className='text-xl'>
								Please confirm the validity of your email address
							</p>
						</div>
						<div className='flex flex-row items-center gap-4 mt-72 w-9/12'>
							<AiOutlineInfoCircle
								size={26}
								className='text-[#A9A9A9]'
							/>
							<p className='text-[#A9A9A9] text-sm'>
								We are needing of your verification to avoid duplication of
								accounts and for security measures.
							</p>
						</div>
					</div>
				</div>
				<div className='w-8/12 m-auto ml-8'>
					<div className='flex flex-col gap-4'>
						<h1 className='font-extrabold text-6xl leading-relax'>
							Kindly check your email for a verification link
						</h1>
						<p>Your email</p>
						<p className='border border-[#777777] w-7/12 rounded-md py-2 pl-4 text-[#BBBBBB]'>
							franfra10j@gmail.com
						</p>
						<p className='text-[#777777]'>
							Didn’t receive the email? Please check your spam folder or try to
							resend the email
						</p>
						<div className='flex'>
							<button className='bg-primary py-2 px-4 rounded-md text-white hover:bg-[#0032a8] duration-200'>
								Resend Email
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Verified;
