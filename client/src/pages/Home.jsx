import React from "react";
import banner from '../assets/Banner-3-1.jpg'

const Home = () => {
    return (
        <section className="bg-white">
            <div className="container mx-auto my-4 px-4">
                <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse"} `}>
                <img src={banner} 
                alt="banner" 
                className="w-full h-full hidden lg:block "
                />
               
                </div>
            </div>
        </section>
    );
}
    
export default Home;