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
	GiCarousel,
	GiFlowers,
	GiChurch,
	GiTempleGate,
	GiSaintBasilCathedral,
	GiCastle,
} from "react-icons/gi";
import { MdOutlineMuseum, MdMosque } from "react-icons/md";
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
	{ value: "theme park", icon: <GiCarousel /> },
	{ value: "garden", icon: <GiFlowers /> },
	{ value: "church", icon: <GiChurch /> },
	{ value: "temple", icon: <GiTempleGate /> },
	{ value: "mosque", icon: <MdMosque /> },
	{ value: "cathedral", icon: <GiSaintBasilCathedral /> },
	{ value: "castle", icon: <GiCastle /> },
];
