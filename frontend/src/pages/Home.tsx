import Layout from "@components/Layout.tsx"
import Container from "@components/Container.tsx"
import ContrastBlock from "@components/ContrastBlock.tsx"
const Home = () => {
  return (
    //<Container title="Good Morning, Hacker">
    //  <div className="flex gap-4">
    //    <img src="/logo.png" className="size-40"/>
    //    <ContrastBlock className="flex-1 px-4">WPHunter is your secret weapon for WordPress plugin/theme analysis. Beat other hackers to the punch and discover critical vulnerabilities first. Load your target, let our engine work, and claim your bounty. The hunt begins now.</ContrastBlock>
    //  </div>
    //    <ContrastBlock>test</ContrastBlock>
    //</Container>
    <Layout>
      <div className="mx-auto max-w-6xl py-20 px-4 flex flex-col-reverse gap-10 md:flex-row md:gap-20">
        <div className="flex-col antialiased">
          <div className="pb-6 text-4xl font-bold font-serif">Good evening, Hacker</div>
          <div className="max-w-2xl text-md leading-relaxed">
            WPHunter is your secret weapon for WordPress plugin/theme analysis. Beat other hackers to the punch and discover critical vulnerabilities first. Load your target, let our engine work, and claim your bounty. The hunt begins now.
          </div>
        </div>
        <img src="logo.png" className="size-24 md:size-36 mx-auto"/>
      </div>
    </Layout>
  );
};

export default Home;
