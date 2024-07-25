import React from "react";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import "demos/style.css";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/resume.svg";
import Card from "demos/Card.js";

const Container = tw.div`relative`;

// Apply bottom margin only for mobile devices, dynamically adjustable
const ImageWrapper = styled.div`
  ${tw`w-full flex justify-center items-end`}
  max-width: 100%;
  height: auto;
  margin-bottom: ${(props) =>
    props.marginBottom || "0"}; /* Apply dynamic margin-bottom */

  @media (max-width: 768px) {
    ${tw`mb-20`}/* Default margin-bottom for mobile */
  }
`;

const TwoColumn = styled.div`
  ${tw`flex flex-col lg:flex-row lg:items-stretch max-w-screen-xl mx-auto py-10 md:py-12`}
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
  animation: ${upDown} 2s infinite alternate;
`;

const LeftColumn = styled.div`
  ${tw`relative lg:w-1/2 max-w-lg mx-auto lg:max-w-none`}
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Center content vertically */

  @media (max-width: 768px) {
    ${tw`w-1/2`}
  }
`;

const RightColumn = styled.div`
  ${tw`relative mt-6 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`}
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end; /* Center content vertically */

  @media (max-width: 768px) {
    ${tw`w-1/2`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-end`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

export default () => {
  const items = [
    "What we solve: Our AI-driven resume maker helps applicants craft tailored resumes for specific job descriptions, boosting their ATS scores and improving their chances of getting interview invitations.",
    "How we solve it: Our AI reviews job descriptions to recommend relevant skills and experiences, while also optimizing resume formatting and language to match job keywords.",
    "What user gains: Our tool saves applicants time and effort by creating tailored resumes, enabling them to efficiently apply to more job opportunities and improve their chances of success.",
    "How to use: Applicants upload their resume and job description. Our AI then optimizes the resume to align with job requirements, allowing them to download it in various formats.",
  ];

  return (
    <>
      <Container>
        <div className="App">
          {items.map((item, i) => (
            <TwoColumn key={i}>
              {i % 2 === 0 ? (
                <>
                  <LeftColumn>
                    <ImageWrapper marginBottom="20px">
                      {" "}
                      {/* Example margin */}
                      <AnimatedImage
                        src={DesignIllustration}
                        alt="Design Illustration"
                      />
                    </ImageWrapper>
                  </LeftColumn>
                  <RightColumn>
                    <Card text={item} index={i} />
                  </RightColumn>
                </>
              ) : (
                <>
                  <LeftColumn>
                    <Card text={item} index={i} />
                  </LeftColumn>
                  <RightColumn>
                    <ImageWrapper marginBottom="30px">
                      {" "}
                      {/* Example margin */}
                      <AnimatedImage
                        src={DesignIllustration}
                        alt="Design Illustration"
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
    </>
  );
};
