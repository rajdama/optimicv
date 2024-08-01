import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import "demos/style.css";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import QuestionIllustration from "../../images/question.svg";
import SolutionIllustration from "../../images/solution.svg";
import ProfitIllustration from "../../images/profit.svg";
import PathIllustration from "../../images/path.svg";
import Card from "demos/Card.js";
import "../../ScrollEffect.css"; // Create a CSS file for styles
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Container = tw.div`relative`;

const ImageWrapper = styled.div`
  ${tw`w-full flex justify-center items-end`}
  width: 70%; /* Default width for desktop view */
  height: auto;

  @media (max-width: 768px) {
    ${tw`w-full mb-20`} /* Width for mobile view */
    margin-right: ${(props) => props.marginRight || "0"};
    margin-left: ${(props) => props.marginLeft || "0"};
    margin-top: ${(props) => props.marginTop || "0"};
    width: 80%;
  }
`;

const TwoColumn = styled.div`
  ${tw`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-10 md:py-12`}
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    ${tw`py-6`}
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const upDown = keyframes`
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
`;

const AnimatedImage = styled.img`
  ${tw`object-cover`}
  width: 100%;
  height: auto;
`;

const LeftColumn = styled.div`
  ${tw`relative lg:w-1/2 max-w-lg mx-auto lg:max-w-none flex justify-center items-center`}
  @media (max-width: 768px) {
    ${tw`w-1/2`}
  }
`;

const RightColumn = styled.div`
  ${tw`relative mt-6 lg:mt-0 flex-1 flex flex-col justify-center lg:self-center`}
  @media (max-width: 768px) {
    ${tw`w-1/2`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-end`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const getImageByIndex = (index) => {
  switch (index) {
    case 0:
      return QuestionIllustration;
    case 1:
      return SolutionIllustration;
    case 2:
      return ProfitIllustration;
    case 3:
      return PathIllustration;
    default:
      return null;
  }
};

export default () => {
  const items = [
    "What we solve: Our AI-driven resume maker helps applicants craft tailored resumes for specific job descriptions, boosting their ATS scores and improving their chances of getting interview invitations.",
    "How we solve it: Our AI reviews job descriptions to recommend relevant skills and experiences, while also optimizing resume formatting and language to match job keywords.",
    "What user gains: Our tool saves applicants time and effort by creating tailored resumes, enabling them to efficiently apply to more job opportunities and improve their chances of success.",
    "How to use: Applicants upload their resume and job description. Our AI then optimizes the resume to align with job requirements, allowing them to download it in various formats.",
  ];
  const [currentPanel, setCurrentPanel] = useState(0);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: "restart pause resume pause",
      scroller: ".container",
    });

    gsap.to(".orange p", {
      scrollTrigger: ".orange",
      duration: 2,
      rotation: 360,
    });

    gsap.to(".red", {
      scrollTrigger: {
        trigger: ".red",
        toggleActions: "restart pause reverse pause",
      },
      duration: 1,
      backgroundColor: "#FFA500",
      ease: "none",
    });

    gsap.to(".yoyo p", {
      scrollTrigger: ".yoyo",
      scale: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2",
    });

    const container = document.querySelector(".container");
    const handleScroll = () => {
      const panelHeight = window.innerHeight;
      const scrollTop = container.scrollTop;
      const newPanel = Math.round(scrollTop / panelHeight);
      setCurrentPanel(newPanel);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container style={{ marginTop: "-100px" }}>
      <div className="App container">
        {items.map((item, i) => (
          <TwoColumn
            className={`panel blue ${currentPanel === i ? "active" : ""}`}
            key={i}
            style={{ marginTop: "50px" }}
          >
            {i % 2 === 0 ? (
              <>
                <LeftColumn>
                  <ImageWrapper marginRight="10px" marginTop="100px">
                    <AnimatedImage
                      src={getImageByIndex(i)}
                      alt="Illustration"
                    />
                  </ImageWrapper>
                </LeftColumn>
                <RightColumn>
                  <Card text={item} index={i} />
                </RightColumn>
              </>
            ) : (
              <>
                <LeftColumn style={{ marginRight: "45px" }}>
                  <Card text={item} index={i} />
                </LeftColumn>
                <RightColumn>
                  <ImageWrapper marginLeft="10px" marginTop="50px">
                    <AnimatedImage
                      src={getImageByIndex(i)}
                      alt="Illustration"
                    />
                  </ImageWrapper>
                </RightColumn>
              </>
            )}
          </TwoColumn>
        ))}
      </div>
      <DecoratorBlob1 />
    </Container>
  );
};
