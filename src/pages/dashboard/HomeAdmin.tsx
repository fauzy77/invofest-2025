import React from "react";
import { CardStats } from "@/components/admin/CardStats";
import { MdCoPresent, MdDesignServices } from "react-icons/md";
import { FaMicrophoneAlt, FaWrench } from "react-icons/fa";
import { RiImageEditLine } from "react-icons/ri";
import { FaGlobe } from "react-icons/fa6";
import { BarChartStats } from "@/components/admin/BarChartStats";
import { PieChartStats } from "@/components/admin/PieChartStats";

const chartData = [
  { name: "Seminar", total: 50 },
  { name: "Talkshow", total: 50 },
  { name: "Workshop", total: 90 },
  { name: "Poster", total: 143 },
  { name: "UI/UX", total: 132 },
  { name: "Web Design", total: 100 },
];

export const HomeAdmin: React.FC = () => {
    return (
        <div className="min-h-screen p-1">
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
                Selamat Datang di Dashboard Admin
            </h2>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <CardStats
                    title="Pendaftar Seminar"
                    icon={<MdCoPresent />}
                    value={50}
                    color="bg-blue-500"
                    url="dashboard/seminar"
                />
                <CardStats
                    title="Pendaftar Talkshow"
                    icon={<FaMicrophoneAlt />}
                    value={50}
                    color="bg-purple-500"
                    url="dashboard/talkshow"
                />
                <CardStats
                    title="Pendaftar Workshop"
                    icon={<FaWrench />}
                    value={90}
                    color="bg-emerald-500"
                    url="dashboard/workshop"
                />
                <CardStats
                    title="Pendaftar Competition Poster Design"
                    icon={<RiImageEditLine />}
                    value={143}
                    color="bg-rose-500"
                    url="dashboard/competition/poster"
                />
                <CardStats
                    title="Pendaftar Competition UI/UX Design"
                    icon={<MdDesignServices />}
                    value={132}
                    color="bg-indigo-500"
                    url="dashboard/competition/uiux"
                />
                <CardStats
                    title="Pendaftar Competition Web Design"
                    icon={<FaGlobe />}
                    value={100}
                    color="bg-teal-600"
                    url="dashboard/competition/web-design"
                />
            </div>

            {/* Grafik */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartStats data={chartData} />
                <PieChartStats data={chartData} />
            </div>
        </div>
    );
};
