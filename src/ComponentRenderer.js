import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

// Import SaaS landing page component and image
import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";
import SaaSProductLandingPageImageSrc from "images/demo/SaaSProductLandingPage.jpeg";

export const components = {
  landingPages: {
    SaaSProductLandingPage: {
      component: SaaSProductLandingPage,
      imageSrc: SaaSProductLandingPageImageSrc,
      url: "/components/landingPages/SaaSProductLandingPage",
    },
  },
};

export default () => {
  const { type, name } = useParams();

  try {
    let Component = null;
    if (type === "landingPages") {
      Component = components[type][name].component;
    }

    if (Component) {
      return (
        <AnimationRevealPage disabled>
          <Component />
        </AnimationRevealPage>
      );
    }

    throw new Error("Component Not Found");
  } catch (e) {
    console.log(e);
    return <div>Error: Component Not Found</div>;
  }
};
