import React from "react";
import tw, { styled, css } from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/TwoColumnWithInput.js";
import Features from "components/features/ThreeColWithSideImage.js";

const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-700`;
const HighlightedText = tw.span`text-gray-700`;

const ResponsiveHeading = styled.div`
  ${tw`text-2xl lg:text-4xl text-center whitespace-nowrap overflow-hidden px-4`}
  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 1.2rem;
    `}
`;

export default () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <AnimationRevealPage>
      <Hero roundedHeaderButton={true} />
      <Features
        subheading={<Subheading>Features</Subheading>}
        heading={
          <ResponsiveHeading isMobile={isMobile}>
            We have Amazing <HighlightedText>Service.</HighlightedText>
          </ResponsiveHeading>
        }
      />
      {/* Other components can follow here */}
    </AnimationRevealPage>
  );
};
