import { useLottie } from "lottie-react";
import animationData from "../../Assests/animations/9295-full-movie-experience-including-music-news-video-weather-and-lots-of-entertainment.json";

const style = {
  height: 300,
};

const Loader = () => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(options, style);

  return(
    <div className="w-full h-screen flex items-center justify-center">
      {View}
    </div>
  )
};

export default Loader;
