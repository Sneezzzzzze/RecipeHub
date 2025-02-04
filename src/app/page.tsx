'use client';

import "@clayui/css/lib/css/atlas.css";
import Search from './ui/component/search';
import Header from './ui/component/header';
import Content from './ui/component/content';
import Footer from "./ui/component/footer";


export default function Home() {

    return (
        <>
            {/* Header */}
            <Header/>
            {/* Content */}
            <Content>
                <Search/>
            </Content>
            <Footer/>
            {/* Footer */}
        </>
    );
}
