import { GridItem, Image, Text } from "@chakra-ui/react";

type Props = {
  name: string;
  url: string;
};

export const ImageItem = ({ name, url }: Props) => {
  return (
    <GridItem h='100%' boxShadow='lg' bg='gray.100' p='2' rounded='md'>
      <Image fit='cover' maxH='300px' src={url} alt={name} borderRadius='sm' />
      <Text align='center' fontSize='xs' mt={4}>
        {name}
      </Text>
    </GridItem>
  );
};
