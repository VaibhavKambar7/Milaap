import React, { useState } from "react";
import {
  Container,
  Stack,
  Text,
  Button,
  Image,
  useToast,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const CaptureTrainPage = () => {
  const [loading, setLoading] = useState(false); // State to track loading state
  const toast = useToast(); // To use Chakra UI toast
  const navigate = useNavigate(); // To use navigate for redirection

  const handleCaptureDataset = () => {
    setLoading(true); // Set loading state to true when capturing dataset starts

    axios
      .post("http://localhost:5000/capture-dataset")
      .then((response) => {
        console.log(response.data.message);
        // Show toast notification
        toast({
          title: "Capture Success",
          description: "Images captured successfully.",
          status: "success",
          duration: 3000, // Display duration
          isClosable: true, // Allow user to close the toast manually
        });
        // Scroll to the bottom of the page
        window.scrollTo(0, document.body.scrollHeight);
      })
      .catch((error) => {
        console.error("Error capturing dataset:", error);
        // Show toast notification for error
        toast({
          title: "Capture Error",
          description: "An error occurred while capturing images.",
          status: "error",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when capturing dataset completes (whether successful or failed)
      });
  };

  const handleTrainModel = () => {
    setLoading(true); // Set loading state to true when training model starts

    axios
      .post("http://localhost:5000/train-model")
      .then((response) => {
        console.log(response.data.message);
        // Show toast notification for successful train model
        toast({
          title: "Success",
          description: "Model trained successfully.",
          status: "success",
          duration: 2000, // Set duration to 2 seconds
        });
        // Redirect to face recognition page after 2 seconds
        setTimeout(() => {
          navigate("/face-recognition");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error training model:", error);
        // Show toast notification for error
        toast({
          title: "Error",
          description: "An error occurred while training the model.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading state to false when training model completes (whether successful or failed)
      });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center vertically
          }}
        >
          <Spinner size="xl" color="white" speed="0.95s" thickness="6px" />
        </div>
      )}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        onClick={handleBack}
        position="absolute"
        top={6}
        left={6}
        zIndex={17}
      />
      {/* Capture section */}
      <div style={{ width: "100%", height: "100vh" }}>
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="63px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch" // Stretch the text to match the height of the image
            spacing={8}
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              maxW="480px"
            >
              <Text
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                color="gray.700"
              >
                Capture
              </Text>
              <Text
                fontSize="1.2rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="400"
                color="gray.700"
              >
                This process will capture 300 images of your face. The captured
                images will be used to train a machine learning model to
                recognize facial features and expressions.
              </Text>
              <Button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="black"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                bg="#F0E4C7"
                transition="background-color 0.3s, color 0.3s"
                _hover={{ bg: "#977C64", color: "white" }}
                onClick={handleCaptureDataset}
              >
                Capture Dataset
              </Button>
            </Stack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK038LcHXogO1Bw9VKPwY7ohtgS4Tfbcoln81Pn5fDjSwSsd8Pv04Mwj2uU22PRgXs3qQ&usqp=CAU"
              alt="Capture Image"
              w={{ base: "100%", md: "45%" }}
              h="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </div>

      {/* Train section */}
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "#F0E4C7" }}
      >
        <Container maxW="6xl" px={{ base: 6, md: 3 }} py={19} pt="123px">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="stretch" // Stretch the text to match the height of the image
            spacing={8}
          >
            <Stack
              direction="column"
              spacing={6}
              justifyContent="center"
              maxW="480px"
            >
              <Text
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                textAlign="left"
                color="black"
              >
                Train Model
              </Text>
              <Text
                fontSize="1.2rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="400"
                color="black"
              >
                The training process involves using machine learning algorithms
                to analyze and learn patterns from a dataset. This dataset
                typically consists of labeled examples that the model uses to
                adjust its internal parameters and improve its performance.
              </Text>
              <Button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="white"
                size="lg"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                bg="#977C64"
                transition="background-color 0.3s, color 0.3s"
                _hover={{ bg: "#977C64", color: "black" }}
                onClick={handleTrainModel}
              >
                Train Model
              </Button>
            </Stack>
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8KdMo6ziodug34pr1U5zjceZ1i50N-M-jwtBxQAWTJBsFqsklOM-gVAFiKLBZY-1ZrM&usqp=CAU"
              alt="Train Image"
              w={{ base: "100%", md: "50%" }}
              h="auto"
              objectFit="cover"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default CaptureTrainPage;
