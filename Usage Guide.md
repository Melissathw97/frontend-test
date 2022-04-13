This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Sample Griter NEXT-JS PWA Boilerplate

This is a reusable skeleton for Next-js with PWA installed.

<br><br>

## Next JS Benefits

By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Next.js has all 3 forms of rendering: Static Generation (SG), Server-side Rendering (SSR) and Client-side Rendering (CSR).

**Static Generation**
> is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

**Server-side Rendering**
> is the pre-rendering method that generates the HTML on each request.

**Client-side Rendering**
> is the rendering method that generates the HTML once the user landed on the page. This is useful for mounted functions that fires everytime a page is loaded. E.g: dynamic links with protected route. You need token to access the page, axios will check the request header for authorization token before sending the request, and that can only happen when the user is logged in.

<br><br>

## Features

These plugins are already installed and ready to use 

* **SASS** : Can write & read scss files with no problems<br>
* **Next-pwa** : Will generate a `serviceworker.js` upon deployment. `Manifest.json` and required icons are prepared too.<br>
* **Framer Motion** : Adds animation/transition to components and pages.<br>
* **Axios** : API calls<br>
* **JS-Cookie** : Set and Get cookies from browser:
    ```js
    // Set cookie
    const userId = "12345678";
    Cookies.set("userId", userId);

    // Get cookie
    const userId = Cookies.get("userId");
    ```

* **Playwright** : Test framework has been setup completely. To write test scripts, place your script under the `/tests/` folder with the file naming of `*.spec.mjs`.
* **Next-sitemap** : Add this package if necessary.
    ```shell
    yarn add next-sitemap -D
    ```
    You can generate both static and server side rendered sitemap if necessary, refer to [next-sitemap GitHub page](https://github.com/iamvishnusankar/next-sitemap) to see the steps to setup the sitemap generation.
* **WebPush** : Add this package if necessary.
    ```shell
    yarn add web-push
    ```
    Run `yarn vapid` to generate keys, put it into your env file and set a subscriber to your desired pages (Pages landed will have a allow notification popup if the subscriber exist). More info please refer to [web-push GitHub page](
    https://github.com/web-push-libs/web-push) or can follow the instructions below under [this section](https://github.com/wjphe1/next-boilerplate#setup-webpush-for-notification) below.

<br><br>

## Usage

1. **Adding Static pages** : Pages are all server rendered. To add new page, just add a new <page>.js file under `/pages/` and boom, there's your new page.<br>
2. **Adding Dynamic pages** : Pages that begin with `[` and end with `]` are dynamic routes. Example: `[id].js` (please refer to the file to see the structure of a dynamic page).<br>
3. **Persist Components (Navbar)** : Refer to `/components/layout.js` for the layout design, then wrap all your pages js file with that layout. Example:

    ```js
    import Meta from '../components/_meta'
    import Layout from '../components/layout'

    export default function Index() {
        return (
            <Layout>
                <Meta title={myCurrentPageTitle} />

                <h1>Hello World!</h1>
            </Layout>
        )
    }
    ```

4. **Customized META** : With reference to the example above, each js created can include a `<Head></Head>` section wrapping all your desired meta tags for that current page. General Meta tags are currently placed in `/components/_meta.js`<br>

5. **CSS** : styles can be written in 3 ways ->
    * **inline jsx** : Include the following lines in your js file:

    ```jsx
    <style jsx>{`
        // styles go here
    `}</style>
    ```

    * **Global css** : Add scss files in the `/styles/` folder and import them in your js files. The classNames are called by string
    * **Module css** : An example of module css file goes like this: *style.module.scss*. These module css are made to be scoped in specific component files. These styles must be called by importing as a variable

    ```jsx
    import styles from '../styles/style.module.scss'
    
    ...
    <div className={styles.container}>Hello World!</div>
    ...
    ```

6. **Images** : Please place new images in /public/images/. `src` to call images is `/images/<photo>.png`. E.g:

    ```html
    <img src="/images/photo.png"/>
    ```

7. **Protected Routes** : For paths that needed credentials, can be wrapped with the `AuthProvider` component in `/components/auth/auth.js`. Change the api endpoints and routes in the `api.js` and wrap your desired pages with the layout in `/components/admin/layout.js`<br>

8. **Animations** : The package `framer-motion` provides many flexibility in components/pages animation. The core of the Motion API are `motion` components. To animate elements, we need to replace primitive DOM elements (like `div`, `svg`, etc.) with their Motion counterparts: `motion.div`, `motion.svg`, etc. These components offer extra props that allow you to declaratively add animations and gestures.

    `motion` components are animated via the `animate` prop which can accept an object, variant label(s), or a reference to imperative animation controls.

    Here's a simple component that animates a single div element:

    ```js
    import { motion } from 'framer-motion';

    export const MyComponent = () => (
    <motion.div
        animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%']
        }}
    />
    );
    ```

    Framer Motion provides an [AnimatePresence](https://www.framer.com/api/motion/animate-presence/) component which makes it possible to animate React components as they mount and unmount. To be able to animate page transitions, `AnimatePresence` must be a direct parent component of individual page components.
    In the `pages/_app.js`:

    ```js
    import { AnimatePresence } from 'framer-motion';

    function MyApp({ Component, pageProps }) {
        return <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
        </AnimatePresence>
    }

    export default MyApp
    ```

    `exitBeforeEnter` prop is added to make sure the exiting page finishes its exit animation before the next page starts animating. Then, create a parent `motion.div` component in all of the pages with the `variants` prop that defined how the child elements will transition on exit. Noted that an `exit` variant is needed if `exitBeforeEnter` prop is added.

    ```js
    <motion.div initial="initial" animate="enter" exit="exit" variants={{ exit: opacity: 0 } }}>
        <div className="posts">...</div>
    </motion.div>
    ```

9. **Environment Variables** : To use environment variables, you can rename `.env.local.example` to `.env.local` and add your variables into it. After that, go to `next.config.js` to re-declare your environment variables for a cleaner and safer usage.

10. **Testing** : There are a lot of testing methods and the most important ones for frontend are `Unit Testing`, `Component Testing` and `Integration Testing`. These tests will let you know which part of your code brokes or not working as it should when you change something. Example of test scripts:

    ```js
    import { test, expect } from '@playwright/test'

    test('should navigate to the config page', async ({ page }) => {
        // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
        await page.goto('http://localhost:3000/')
        // Find an element with the text 'About Page' and click on it
        await page.click('text=Config')
        // The new url should be "/about" (baseURL is used there)
        await expect(page).toHaveURL('http://localhost:3000/config/notification')
        // The new page should contain an h1 with "About Page"
        await expect(page.locator('h1')).toContainText('Notification subscription')
    })
    ```

<br><br>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

If you want to create api routes, please refer to [Next.js API routes documentation](https://nextjs.org/docs/api-routes/introduction). The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<br>

## Setup Webpush for Notification

To subscribe to webpush notification, you will need to first obtain the vapid keys by entering the commands in your terminal below.

``` bash
cd next-boilerplate
yarn install
yarn add web-push
yarn vapid
```

Create a `.env.local` file or use the example template from `.env.local.example`, and put the public key generated from the previous steps

```
WEB_PUSH_EMAIL=user@example.com
WEB_PUSH_PRIVATE_KEY=<vapid-private-key>
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=<vapid-public-key>
```

Test it locally (Build and start)

``` bash
yarn build
yarn start
```

You can play around with the subscribe, uns-subscribe and send test push at `/config/notification`.

<br>

## Test Your Code

```bash
yarn build
yarn start
```

On a separate terminal, run the test script:

```bash
yarn test
```

You might run into error when running test the first time like: `browserType.launch: Executable doesn't exist at...`, you may run this command before rerunning the test.

```bash
npx playwright install chronium
```

<br>

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
