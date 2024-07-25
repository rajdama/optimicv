import React, { useRef } from "react";
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
  height: 220px;
  overflow: hidden;
  box-sizing: border-box;
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
`;

const Content = styled.p`
  ${tw`text-base`}
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

function Card({ text, index }) {
  const [title, content] = text.split(": ", 2);
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <CardContainer
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      viewport={{ once: false }}
    >
      <Title ref={ref}>
        <div style={{ marginBottom: "8px" }}>{title}</div>
        <Underline style={{ marginBottom: "8px" }} />
      </Title>
      <Content>
        {isInView &&
          content.split(" ").map((el, i) => (
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
