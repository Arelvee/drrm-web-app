import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import SFATBLSQR from '../assets/SFATBLSqr.png';
import BertsImg from '../assets/SFATBLSimg.png';
import backgroundImage from '../assets/SFATBLSbg.png';
import { ChevronsRight } from "lucide-react";

function SFATBLS() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className="mt-20 mb-8 p-4">
        <div className="flex items-start font-semibold">
          <Link to="/" className="flex items-center text-gray-500">
            Home <ChevronsRight className="text-black mx-2" size={20} />
          </Link>
          <p className="text-red-900">SFATBLS Training</p>
        </div>
      </section>

      <section className="relative flex flex-col lg:flex-row min-h-screen justify-center items-start text-red-900 px-4 mb-8 gap-8">
        <div className="lg:w-3/4 p-3 rounded shadow-md sm:w-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <h2 className="text-[#7a0000] font-extrabold">
            Standard First Aid and Basic Life Support (SFATBLS)
          </h2>
          <p className="text-black text-justify leading-relaxed my-6">
            This training aims to equip participants with critical life-saving skills for effective response during emergencies.
          </p>

          <div className="flex flex-col lg:flex-row items-center mt-8 gap-8">
            <img src={BertsImg} alt="SFATBLS Training" className="w-80 rounded" />
            <div>
              <h2 className="text-[#7a0000] text-xl sm:text-3xl font-extrabold uppercase mb-4">What is SFATBLS?</h2>
              <p className="text-black text-sm sm:text-lg text-justify leading-relaxed mb-6">
                The Standard First Aid and Basic Life Support training equips participants with the essential skills to respond to emergencies with confidence and care. It includes CPR, wound care, and real-life emergency simulations.
              </p>
              <h2 className="text-[#7a0000] text-xl sm:text-3xl font-extrabold uppercase mb-4">What We Do at SFATBLS?</h2>
              <ul className="text-black text-sm sm:text-lg leading-relaxed list-disc list-outside space-y-2 ml-6">
                <li>CPR and rescue breathing drills</li>
                <li>Bleeding control and bandaging</li>
                <li>Shock and fracture management</li>
                <li>Scene safety and patient transport</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#7a0000] rounded shadow-md text-center w-full grid grid-cols-1 gap-2 lg:w-1/3 sm:w-full">
          <div className="flex flex-col items-center sm:col-span-1">
            <p className="text-yellow-400 sm:text-xl font-bold">Training Fee:</p>
            <p className="text-white sm:text-3xl mb-0">Php 7,000/Participant</p>
            <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe9C4GgUC6R_huvzUfzUS_ozeRkc_qRR7yevQUs3yVhcxXi5Q/viewform?fbclid=IwY2xjawK8nlJleHRuA2FlbQIxMABicmlkETE4WDZEVTB6dXgwR2pZTUEwAR4HbFsIPDvaG5VbAp4WjcM79vGzF_KZM9D6IAtlFAoRgak_RWVyb-jS8XPEvQ_aem_F2TzYeWsgNzFY_8xKN0s6w"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block sm:text-lg bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-yellow-600"
                >
                JOIN NOW!
            </a>
            <div className="mt-3">
              <p className="text-white mb-4">Or Scan the QR Code Below:</p>
              <img src={SFATBLSQR} className="w-20 sm:w-40 mx-auto" alt="QR Code" />
            </div>
          </div>

          <div className="row-span-2 sm:col-span-1">
            <p className="text-yellow-400 sm:text-lg font-bold">Training Dates:</p>
            <ol className="grid grid-cols-2 gap-4 mt-4 text-white text-sm sm:text-lg">
              <li className="border border-white p-2 rounded-full text-center">June 16-19</li>
              <li className="border border-white p-2 rounded-full text-center">June 30-July 3 </li>
              <li className="border border-white p-2 rounded-full text-center">July 14-17</li>
              <li className="border border-white p-2 rounded-full text-center">August 4-5</li>
              <li className="border border-white p-2 rounded-full text-center">August 11-14</li>
              <li className="border border-white p-2 rounded-full text-center">September 8-11</li>
              <li className="border border-white p-2 rounded-full text-center">September 22-25</li>
              <li className="border border-white p-2 rounded-full text-center">October 6-9</li>
              <li className="border border-white p-2 rounded-full text-center">October 20-23</li>
              <li className="border border-white p-2 rounded-full text-center">November 3-6</li>
              <li className="border border-white p-2 rounded-full text-center">November 17-20</li>
              <li className="border border-white p-2 rounded-full text-center">December 12-19</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SFATBLS;
