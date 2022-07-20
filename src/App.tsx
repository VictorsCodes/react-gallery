import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import { ImageItem } from "./components/ImageItem";
import { getAllPhotos, uploadPhoto } from "./services/photos";
import { Photo } from "./types/photo";
import uploadIcon from "./assets/upload.svg";
import "./index.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setImages(await getAllPhotos());
      setIsLoading(false);
    };
    fetchImages();
  }, []);

  const submitAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("images") as File;

    if (file && file.size > 0) {
      setIsUploading(true);
      let result = await uploadPhoto(file);
      setIsUploading(false);

      if (result instanceof Error) {
        alert("Deu erro em primo");
      } else {
        let newImage = [...images];
        newImage.push(result);
        setImages(newImage);
      }
    }
  };

  return (
    <Container maxW='4xl'>
      <Heading
        textAlign='center'
        bgGradient='linear(to-r, #2193b0, #6dd5ed)'
        bgClip='text'
        my={10}
      >
        Galeria de Fotos
      </Heading>

      <form action='POST' onSubmit={submitAction}>
        <Box
          mb={10}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          gap={2}
        >
          <label htmlFor='enviar'>
            <img src={uploadIcon} width='20px' alt='' />
            <input type='file' id='enviar' name='images' />
          </label>
          <Button
            type='submit'
            isLoading={isUploading}
            loadingText='Carregando'
            colorScheme='facebook'
            spinnerPlacement='start'
            size='lg'
          >
            Enviar
          </Button>
        </Box>
      </form>

      {isLoading && (
        <Center>
          <Spinner color='blue.300' size='xl' thickness='4px' />
        </Center>
      )}

      {!isLoading && images.length > 0 && (
        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          {images.map((images, index) => (
            <ImageItem key={index} url={images.url} name={images.name} />
          ))}
        </Grid>
      )}

      {!isLoading && images.length === 0 && (
        <Center>
          <Alert status='error'>
            <AlertIcon />
            Não há fotos para exibir
          </Alert>
        </Center>
      )}
    </Container>
  );
};

export default App;
