import { Link } from 'react-router-dom';
import News1 from '../assets/news (1).png';

function News() {
    return(
        <main>
            <section className="mt-20 mb-8 px-8">
            <div class="flex items-start text-black font-semibold py-4">
                    <Link
                        to="/"
                        className="flex items-center"
                    >
                        Home <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right mx-2"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                    </Link>
                    <p className="text-red-900">News</p>
                </div>
                <h2 className="text-3xl font-semibold text-center text-red-900 uppercase text-left">News</h2>
                <ol className='grid grid-cols-2'>
                    <li>
                        <a className="block sm:flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative">
                            <img src={News1} alt="News update" className="h-40 w-full object-cover rounded-md" />
                                <div className="block sm:flex sm:flex-col justify-between">
                                    <h1 className="text-xl my-2 sm:my-0 sm:text-xl font-semibold leading-relaxed hover:text-red-900">
                                        HOPE: Strengthening Hospital Preparedness for Emergencies
                                    </h1>
                                    <p className="flex gap-2 mt-2 text-gray-600 sm:absolute sm:bottom-6 sm:right-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days">
                                            <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                                        </svg>January 00, 2025
                                    </p>
                                </div>
                        </a>
                    </li>
                    <li>
                    <a className="block sm:flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative">
                            <img src={News1} alt="News update" className="h-40 w-full object-cover rounded-md" />
                                <div className="block sm:flex sm:flex-col justify-between">
                                    <h1 className="text-xl my-2 sm:my-0 sm:text-xl font-semibold leading-relaxed hover:text-red-900">
                                        HOPE: Strengthening Hospital Preparedness for Emergencies
                                    </h1>
                                    <p className="flex gap-2 mt-2 text-gray-600 sm:absolute sm:bottom-6 sm:right-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days">
                                            <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                                        </svg>January 00, 2025
                                    </p>
                                </div>
                        </a>
                    </li>
                    <li>
                    <a className="block sm:flex bg-white rounded-2xl shadow-lg p-4 gap-6 relative">
                            <img src={News1} alt="News update" className="h-40 w-full object-cover rounded-md" />
                                <div className="block sm:flex sm:flex-col justify-between">
                                    <h1 className="text-xl my-2 sm:my-0 sm:text-xl font-semibold leading-relaxed hover:text-red-900">
                                        HOPE: Strengthening Hospital Preparedness for Emergencies
                                    </h1>
                                    <p className="flex gap-2 mt-2 text-gray-600 sm:absolute sm:bottom-6 sm:right-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-days">
                                            <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>
                                        </svg>January 00, 2025
                                    </p>
                                </div>
                        </a>
                    </li>
                </ol>
            </section>
            
        </main>
    );
}

export default News;