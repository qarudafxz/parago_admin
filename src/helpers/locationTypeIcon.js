import { FaUmbrellaBeach } from "react-icons/fa";
import { BiWater } from "react-icons/bi";
import {
	GiMountaintop,
	GiCircleForest,
	GiBoatHorizon,
	GiWaterfall,
	GiCaveEntrance,
	GiIsland,
	GiAnimalSkull,
} from "react-icons/gi";
import { MdOutlineMuseum } from "react-icons/md";
import { TbBuildingCarousel } from "react-icons/tb";

export const LOCATION_TYPE = [
	{ value: "beach", icon: <FaUmbrellaBeach /> },
	{ value: "mountain", icon: <GiMountaintop /> },
	{ value: "forest", icon: <GiCircleForest /> },
	{ value: "lake", icon: <GiBoatHorizon /> },
	{ value: "river", icon: <BiWater /> },
	{ value: "waterfall", icon: <GiWaterfall /> },
	{ value: "cave", icon: <GiCaveEntrance /> },
	{ value: "island", icon: <GiIsland /> },
	{ value: "museum", icon: <MdOutlineMuseum /> },
	{ value: "park", icon: <TbBuildingCarousel /> },
	{ value: "zoo", icon: <GiAnimalSkull /> },
	{ value: "theme park", icon: <TbBuildingCarousel /> },
	{ value: "garden", icon: <TbBuildingCarousel /> },
	{ value: "church", icon: <TbBuildingCarousel /> },
	{ value: "temple", icon: <TbBuildingCarousel /> },
	{ value: "mosque", icon: <TbBuildingCarousel /> },
	{ value: "cathedral", icon: <TbBuildingCarousel /> },
	{ value: "castle", icon: <TbBuildingCarousel /> },
];
