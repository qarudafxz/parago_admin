import { TbKayak } from "react-icons/tb";
import { BsGrid1X2Fill } from "react-icons/bs";
import { RiCalendarEventFill } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";

export const navbar_menu = [
	{
		title: "Overview",
		icon: <BsGrid1X2Fill />,
		link: "/dashboard",
	},
	{
		title: "Calendar",
		icon: <RiCalendarEventFill />,
		link: "/calendar",
	},
	{
		title: "Events",
		icon: <TbKayak />,
		link: "/events",
	},
	{
		title: "Bookings",
		icon: <TbBrandBooking />,
		link: "/bookings",
	},
	{
		title: "Places",
		icon: <GiIsland />,
		link: "/places",
	},
	{
		title: "Locals",
		icon: <IoPeopleCircleSharp />,
		link: "/locals",
	},
];
