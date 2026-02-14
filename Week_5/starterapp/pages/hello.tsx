import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const Hello: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Hello World Page</title>
                <meta property="og:title" content="Hello World" key="title" />
            </Head>
            <div>Hello World!</div>
            <div>
                <a href="https://www.ign.com"> Link to external site, ign.com</a>
                <br/>
                <Link href="/components/weather"> Link to the internal weather page</Link>
                <p>Use Link for internal pages to take advantage of the prefetching feature</p>
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    width={72}
                    height={16}
                />
            </div>
        </div>
    );
};

export default Hello;