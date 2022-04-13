// Example static generated dynamic pages
// More details: https://nextjs.org/docs/basic-features/data-fetching#technical-details
// This static props are useful only for api that is not changed frequently as the data
// are only fetched during build time.
// For more dynamic API use case, please refer to [server].js
export default function StaticGeneratedDynamicPage({ name, product }) {
    return <main>
        <div>{product?.id || 'Not found'}</div>
    </main>
}

/* // This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await fetch(`https://api.example.com/api/v1/web/products/all`)
    const posts = await res.json() || {};

    // Get the paths we want to pre-render based on posts
    const paths = posts.products?.map((product) => ({
      params: { id: product.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`https://api.example.com/api/v1/web/products/${params.id}`)
    const data = await res.json() || {};

    // Pass post data to the page via props
    return { props: { product: data.product } }
} */