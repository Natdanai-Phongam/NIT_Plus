import PageLayout from '../components/Layout/PageLayout'

export default function HomePage() {
  return (
    <PageLayout
      title="หน้าหลัก"
      breadcrumb={[
        { label: 'Home', href: '/' },
        { label: 'หน้าหลัก' },
      ]}
    />
  )
}
