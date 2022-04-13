import Meta from '../../components/_meta'
import Layout from '../../components/admin/layout'

export default function Home(props) {
  return (
    <Layout page="Overview">
      <Meta title="Griter Admin" />

      <div>{props.name} - Admin Panel</div>
    </Layout>
  )
}
