import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";

import defaultCardImage from "images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({ 
  cards = null, 
  heading = "Our Key Features", 
  subheading = "Features", 
  description = "Discover the benefits of our resume optimizer designed to boost your job application success rate." 
}) => {
  /*
   * This component has an array of objects representing the feature cards defined below. Each object in the cards array can have the following keys:
   *  1) imageSrc - the image displayed at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   * You can change these keys according to your needs, or pass your own cards using the cards prop.
   */

  const defaultCards = [
    {
      imageSrc: ShieldIconImage,
      title: "High Security",
      description: "We ensure your data is protected with top-tier security measures."
    },
    { 
      imageSrc: SupportIconImage, 
      title: "24/7 Support", 
      description: "Our team is available around the clock to assist you." 
    },
    { 
      imageSrc: CustomizeIconImage, 
      title: "Customizable", 
      description: "Tailor your resume to fit any job description with ease." 
    },
    { 
      imageSrc: ReliableIconImage, 
      title: "Reliability", 
      description: "Count on us for consistent and dependable service." 
    },
    { 
      imageSrc: FastIconImage, 
      title: "Speed", 
      description: "Quickly optimize your resume for immediate job applications." 
    },
    { 
      imageSrc: SimpleIconImage, 
      title: "Ease of Use", 
      description: "Our tool is user-friendly and simple to navigate." 
    }
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Feature"}</span>
                <p className="description">
                  {card.description || "Detailed description of the feature goes here."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
