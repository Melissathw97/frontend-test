// Example server rendered dynamic pages
// More details: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
export default function ServerRenderedDynamicPage({ name, product }) {
    return <main>
        <div>{product?.id || 'Not found'}</div>
    </main>
}

// This function gets called everytime the page is crawled / hitted (Server side)
export async function getServerSideProps(context) {
    // Get current url slug (whichever defines on this file name, e.g: [slug].js)
    const { slug } = context.params;
    // Get current url query paramters (if any exist)
    // const { query1, query2 } = context.query;

    // Fetch data
    const res = await fetch(`https://api.example.com/api/v1/web/products/${slug}`)
    const data = await res.json() || {};

    // Pass post data to the page via props
    return { props: { product: data.product } }
}