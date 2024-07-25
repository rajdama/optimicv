import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";

const shrinkExpand = keyframes`
  0% {
    width: 50%;
  }
  50% {
    width: 0%;
  }
  100% {
    width: 50%;
  }
`;

const CardContainer = styled(motion.div)`
  ${tw`w-full max-w-lg p-6 mx-auto my-4 bg-gray-800 text-white rounded-lg shadow-md`}
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: auto; /* Adjust height to be dynamic */
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 400px) {
    ${tw`p-4`}/* Adjust padding for very small screens */
  }
`;

const Title = styled.h2`
  ${tw`font-bold mb-4 relative`}
  font-size: 1.5rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }

  @media (max-width: 400px) {
    font-size: 0.6rem; /* Further reduce font size for very small screens */
    margin-bottom: 0.5rem; /* Adjust margin-bottom for small screens */
  }
`;

const Underline = styled.div`
  ${tw`h-1 bg-blue-500`}
  width: 50%;
  margin: 0 auto;
  animation: ${shrinkExpand} 2s ease-in-out infinite;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 400px) {
    bottom: -3px; /* Adjust position for very small screens */
  }
`;

const Content = styled.p`
  ${tw`text-base`}
  font-size: 1rem;
  word-break: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }

  @media (max-width: 400px) {
    font-size: 0.5rem; /* Further reduce font size for very small screens */
  }
`;

const insertSoftHyphens = (text) => {
  return text.replace(/([a-z]{5,})/gi, (word) => {
    return word.split("").join("\u00AD");
  });
};

function Card({ text, index }) {
  const [title, content] = text.split(": ", 2);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const hyphenatedContent = insertSoftHyphens(content);

  if (isInView && !hasBeenViewed) {
    setHasBeenViewed(true);
  }

  return (
    <CardContainer
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : index % 2 === 0 ? 50 : -50,
      }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Title ref={ref}>
        <div style={{ marginBottom: "8px" }}>{title}</div>
        <Underline style={{ marginBottom: "8px" }} />
      </Title>
      <Content>
        {hasBeenViewed &&
          hyphenatedContent.split(" ").map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {el}{" "}
            </motion.span>
          ))}
      </Content>
    </CardContainer>
  );
}

export default Card;
