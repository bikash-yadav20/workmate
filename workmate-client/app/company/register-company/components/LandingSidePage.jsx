import Image from "next/image";
import { company, features } from "@/app/constants/company/company";

export default function LandingSidePage() {
  return (
    <div className="flex flex-col  items-center md:items-start h-full md:min-h-screen w-screen md:w-[50vw] bg-radial-glow bg-slate-950 p-8">
      {/* logo and name */}
      <div className="flex items-center -ml-10">
        <Image
          src={company.companyLogo.logo}
          alt={company.companyLogo.description}
          width={80}
          height={80}
          className="object-contain w-20 h-20 md:w-32 md:h-32"
        />
        <h1 className="text-white text-sm -m-4 md:-ml-7  md:text-2xl  font-extrabold">
          {company.companyName.name}
        </h1>
      </div>
      {/* What workmate do */}
      <div className="flex flex-col items-center md:items-start text-center md:text-start">
        <div className=" flex flex-col justify-center gap-8 ">
          <h1 className="text-2xl md:text-2xl text-white font-extrabold ">
            Payroll & Attendance, <br />
            <span className="text-emerald-400 ">automated.</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Set up your workspace in minutes. Track attendance, manage leave{" "}
            <br />
            requests, and run payroll with a single click.
          </p>
        </div>
      </div>
      {/* Features */}
      <div className="flex flex-col gap-4 mt-6 ">
        {features.map((feature) => (
          <div key={feature.text} className="flex items-center gap-4">
            <div className="p-3 bg-[#0D2F33] rounded-xl flex items-center justify-center shrink-0">
              <feature.icon />
            </div>
            <p className="text-xs font-light text-white">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
