import React from "react";
import { type Experience } from "../../api/api";
interface Props {
  experience: Experience;
}
const ExperienceCard: React.FC<Props> = ({ experience: exp }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md ring-1 ring-gray-100 hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 max-w-sm">
      <img
        src={exp.image}
        alt={exp.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{exp.title}</h2>
        <p className="mt-1 text-sm text-gray-600">{exp.shortDescription}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="font-semibold text-gray-900">₹{exp.price}</div>
          <button
            className="text-yellow-500 hover:text-yellow-600 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded px-2 py-1 transition"
            onClick={() => alert(`Viewing details for ${exp.title}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
