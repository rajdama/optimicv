import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import axios from 'axios';

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/resume.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-black leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-black hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-black text-white font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-gray-700 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-50`}
  }
`;

export default ({ roundedHeaderButton }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/send-otp', { phoneNumber: `${phoneNumber}` });
      setIsOtpSent(true);
      alert('OTP sent');
    } catch (error) {
      console.log(error)
      alert('Error sending OTP');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:3001/verify-otp', { phoneNumber: `${phoneNumber}`, otp });
      if (response.status === 200) {
        setIsOtpVerified(true);
        alert('OTP verified successfully');
      }
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <>
      <Header style={{backgroundColor:"pink"}} roundedHeaderButton={roundedHeaderButton} />
      <Container style={{marginBottom:"-80px"}}>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Optimize Your Resume for <span tw="text-gray-700">Better ATS Scores</span>
            </Heading>
            <Paragraph>
              Enhance your resume to align with job descriptions and improve your chances of passing ATS filters.
            </Paragraph>
            <Actions>
              {!isOtpSent ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <button onClick={handleRegister}>Register Now</button>
                </>
              ) : (
               !isOtpVerified && <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button onClick={handleVerify}>Verify OTP</button>
                </>
              )}
            </Actions>
            {isOtpVerified && (
              <p tw="mt-4 text-green-500 font-bold">Registered Successfully!</p>
            )}
          
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img tw="min-w-0 w-full max-w-lg xl:max-w-3xl" src={DesignIllustration} alt="Design Illustration" />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
