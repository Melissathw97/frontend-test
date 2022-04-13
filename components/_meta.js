import Head from 'next/head'

export default function Meta({ title, desc, img, url}) {

    const ztitle = title || 'Griter'
    const zdesc = desc ||  'The Griter Next Boilerplate';
    const zimg = img || '/images/griter192.png';
    const zurl = url || 'https://griter.io/';


    return (
        <Head>
            <title>{ztitle}</title>
            <meta name='application-name' content={ztitle} />
            <meta name='apple-mobile-web-app-title' content={ztitle} />
            <meta name='description' content={zdesc} />
                
            {/* SEO Related */}
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:url' content={zurl} />
            <meta name='twitter:title' content={ztitle} />
            <meta name='twitter:description' content={zdesc} />
            <meta name='twitter:image' content={zimg} />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={zurl} />
            <meta property='og:description' content={zdesc} />
            <meta property='og:site_name' content={zurl} />
            <meta property='og:url' content={zurl} />
            <meta property='og:image' content={zimg} />
        </Head>
    )
}