import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";

import { IStats } from "@/types";

export const stats: IStats[] = [
  {
    title: "10M+",
    icon: <BsBarChartFill size={34} className="text-blue-500" />,
    description: "Automated trades executed with precision across top exchanges worldwide.",
  },
  {
    title: "4.9",
    icon: <BsFillStarFill size={34} className="text-yellow-500" />,
    description: "Average user rating based on performance, reliability, and ease of use.",
  },
  {
    title: "120+",
    icon: <PiGlobeFill size={34} className="text-green-600" />,
    description: "Countries served — Namaio supports traders across the globe in real time.",
  },
];
