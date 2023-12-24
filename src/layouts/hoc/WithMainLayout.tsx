import Layout from "../MainLayout";

const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  );
};

export default withLayout;
