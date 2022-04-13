import { Html, Head, Main, NextScript } from "next/document";

function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name='application-name' content="Easify" />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                <meta name='apple-mobile-web-app-title' content="easify" />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                {/* Windows desktop app browserconfig */}
                <meta name='msapplication-config' content='/images/browserconfig.xml' />
                {/* Windows desktop app start menu tile color */}
                <meta name='msapplication-TileColor' content='#2B5797' />
                {/* Windows desktop app start menu tile image */}
                <meta name="msapplication-TileImage" content="/images/maskable_icon.png"/>
                {/* Disable the grey tap highlight on Windows Phone 8 and greater */}
                <meta name='msapplication-tap-highlight' content='no' />
                <meta name='theme-color' content='#000000' />
                <link rel='manifest' href='/static/manifest.json' />
                
                {/* Font */}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                
                {/* Images */}
                <link rel="apple-touch-icon" sizes="57x57" href="/images/apple-icon-57x57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/images/apple-icon-60x60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/images/apple-icon-72x72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/images/apple-icon-76x76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/images/apple-icon-114x114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/images/apple-icon-120x120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/images/apple-icon-144x144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-icon-152x152.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-icon-180x180.png"/>
                <link rel="icon" type="image/png" sizes="192x192"  href="/images/android-icon-192x192.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon-96x96.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
                <link rel="icon" href="/favicon.ico" />
                <link rel='shortcut icon' href='/favicon.ico' />
                <link rel='mask-icon' href='/images/maskable_icon.png' color='#FFFFFF' />
                    
                {/* SEO Related */}
                <meta name='twitter:card' content='summary' />
                <meta name='twitter:url' content='https://yourdomain.com' />
                <meta name='twitter:title' content="Easify" />
                <meta name='twitter:description' content="Easify description" />
                <meta name='twitter:image' content='https://yourdomain.com/images/android-chrome-192x192.png' />
                <meta property='og:type' content='website' />
                <meta property='og:title' content="https://myeasify.com" />
                <meta property='og:description' content="Easify description" />
                <meta property='og:site_name' content="https://myeasify.com" />
                <meta property='og:url' content='https://yourdomain.com' />
                <meta property='og:image' content='https://yourdomain.com/images/apple-touch-icon.png' />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
};

export default Document