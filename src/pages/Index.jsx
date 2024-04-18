import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Select, CheckboxGroup, Checkbox, Stack, Textarea, useToast, VStack, InputGroup, InputLeftAddon, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaUpload, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [form, setForm] = useState({
    sampleType: "",
    colors: [],
    logo: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    lineSpeed: "",
    printSize: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePreview = () => {
    setIsPreview(true);
  };

  const handleEdit = () => {
    setIsPreview(false);
  };
  const toast = useToast();

  //... rest of the existing handleColorChange and handleInputChange functions

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUniqueNumber = Date.now();
    setUniqueNumber(newUniqueNumber);
    onOpen();
    if (isPreview) {
      setIsPreview(false);
      return;
    }
    toast({
      title: "Form submitted.",
      description: "We've received your sample request.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //... rest of the existing return statement up to the <Container>

  const shippingLabel = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Shipping Label</ModalHeader>
        <ModalBody>
          <Box p={5} border="1px" borderColor="gray.200" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb={2}>
              Cyklop CSC Att.: SampleLab M.Slot {uniqueNumber}
            </Heading>
            <Box>
              Wilhelm Röntgenstraat 10
              <br />
              8013NC Zwolle
              <br />
              Nederland
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => window.print()}>
            Print Label
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      {shippingLabel}
      <Container maxW="container.md" py={10}>
        {isPreview ? (
          <VStack spacing={4} align="stretch" mt={4}>
            <Box>Sample Type: {form.sampleType}</Box>
            <Box>Selected Colors: {form.colors.join(", ")}</Box>
            <Box>Contact Name: {form.name}</Box>
            <Box>Email: {form.email}</Box>
            <Box>Phone: {form.phone}</Box>
            <Box>Company Name: {form.companyName}</Box>
            <Box>Line Speed: {form.lineSpeed}</Box>
            <Box>Print Size: {form.printSize}</Box>
            <Button colorScheme="blue" onClick={handleEdit}>
              Back to Edit
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Confirm and Submit
            </Button>
          </VStack>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <FormControl id="sampleType" mb={4}>
                <FormLabel>Sample Type</FormLabel>
                <Select placeholder="Select sample type" value={form.sampleType} onChange={(e) => setForm({ ...form, sampleType: e.target.value })}>
                  <option value="printed">Printed</option>
                  <option value="blank">Blank</option>
                </Select>
              </FormControl>

              <FormControl id="colors" mb={4}>
                <FormLabel>Colors</FormLabel>
                <CheckboxGroup colorScheme="blue" value={form.colors} onChange={(values) => setForm({ ...form, colors: values })}>
                  <Stack spacing={2} direction="row">
                    <Checkbox value="red">Red</Checkbox>
                    <Checkbox value="blue">Blue</Checkbox>
                    <Checkbox value="green">Green</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl id="logo" mb={4}>
                <FormLabel>Logo</FormLabel>
                <Input type="file" accept="image/*" onChange={(e) => setForm({ ...form, logo: e.target.files[0] })} />
              </FormControl>

              <FormControl id="name" mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </FormControl>

              <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </FormControl>

              <FormControl id="phone" mb={4}>
                <FormLabel>Phone</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+31" />
                  <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </InputGroup>
              </FormControl>

              <FormControl id="companyName" mb={4}>
                <FormLabel>Company Name</FormLabel>
                <Input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
              </FormControl>

              <FormControl id="lineSpeed" mb={4}>
                <FormLabel>Line Speed</FormLabel>
                <Input type="text" value={form.lineSpeed} onChange={(e) => setForm({ ...form, lineSpeed: e.target.value })} />
              </FormControl>

              <FormControl id="printSize" mb={4}>
                <FormLabel>Print Size</FormLabel>
                <Input type="text" value={form.printSize} onChange={(e) => setForm({ ...form, printSize: e.target.value })} />
              </FormControl>
            </form>
            <Button colorScheme="blue" onClick={handlePreview}>
              Preview
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
