import NavigationBar from "./NavigationBar";
import Intro from "./Intro";
import "../style/landingPage.css";

function HomePage() {
  return (
    <div>
      <div className="mainBG">
        <NavigationBar />
        <Intro />
      </div>

      {/* <div className="trending">
        <Trending />
      </div>

      <div className="superhero">
        <SuperHero />
      </div> */}
    </div>
  )
}

export default HomePage