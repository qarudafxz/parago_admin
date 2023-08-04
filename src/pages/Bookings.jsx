import React from "react";

function Bookings() {
	return (
		<>
			<div className='w-full flex flex-col'>
				{/* <ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/> */}
				<div
					className="bg-primary w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://www.wearetravellers.nl/wp-content/uploads/Hier-houden-backpackers-van.jpg')]"
					style={{
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}>
					<h1 className='text-white'>
						Dashboard/<span className='text-white font-semibold'>Bookings</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>Monitor Bookings</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						Have a instant access of updates of your backpackers who booked your
						events. You can select a specific event to view the backpackers who booked
						it.
					</p>
				</div>
			</div>
		</>
	);
}

export default Bookings;
