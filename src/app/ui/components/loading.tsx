import React from 'react';
import Image from "next/image";
import Typewriter from "typewriter-effect";


export default function Loader (){
    return (
        <div className="bg-white flex flex-col min-h-screen items-center justify-center sm:py-12 md:py-16 lg:py-20 text-wrap shadow-lg relative">
            <div className="w-full max-w-md flex flex-col items-center gap-6">
                <Image
                    src="/images/search_state.svg"
                    alt="Success State"
                    width={350}
                    height={350}
                />
                <div className="text-lg">
                    <Typewriter
                        options={{
                            strings: ['Loading....'],
                            autoStart: true,
                            loop: true,
                            deleteSpeed: 3000,
                            cursor: '',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
