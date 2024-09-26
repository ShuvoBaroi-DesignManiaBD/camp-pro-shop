import { Button, Col, Form, Input, Modal, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons"; // Import the UploadOutlined icon properly
import React, { useState } from "react";
import generateCleanObject from "@/utils/generateCleanObject";
import { useAddAProductMutation } from "@/redux/features/product/productApi";

type PropTypes = {
  isModalOpen: boolean;
  closeModal: () => void;
  categories?: string[];
};

interface ImageFile {
  uid: string;
  name: string;
  status?: string;
  url?: string;
  size: number;
  originFileObj?: File;
}

interface FormData {
  images?: {
    fileList?: ImageFile[];
  };
  [key: string]: any; // To allow other fields in formData
}

const ProductAddOrEdit: React.FC<PropTypes> = ({
  isModalOpen,
  closeModal,
  categories = null,
}) => {
  const [fileList, setFileList] = useState<any[]>([]); // State for uploaded files 
  const [addAProduct] = useAddAProductMutation();
  const [form] = Form.useForm();

  // handle the process after clicking on the 'save changes' button
  const handleFinish = async (formData: FormData) => {
    // Convert specific fields to numbers where necessary
    const { price, stockQuantity, ratings, isStock, ...restData } = formData;

    const cleanObject = generateCleanObject({
      ...restData,
      price: Number(price), // Convert price to number
      stockQuantity: Number(stockQuantity), // Convert stockQuantity to number
      ratings: Number(ratings), // Convert ratings to number
      isStock: Boolean(isStock), //
    });

    // Further process as you have before
    const updatedProduct = new FormData();
    
    const images: File[] = [];
    if (formData?.images?.fileList) {
      for (const fileWrapper of formData.images.fileList) {
        if (fileWrapper.originFileObj && fileWrapper.size) {
          images.push(fileWrapper.originFileObj);
        }
      }
    }
    delete cleanObject.images;
    updatedProduct.append("productValues", JSON.stringify(cleanObject));
    // Append images
    if (images.length > 0) {
      images.forEach((image) => {
        updatedProduct.append("images", image); // Each file is appended under the 'images' key
      });
    }
    console.log(cleanObject, images);

    // updatedProduct.append("images", JSON.stringify(images));
    await addAProduct({data: updatedProduct});
    closeModal(false);
  };

  const uploadProps = {
    fileList,
    onChange: (info: any) => {
      let newFileList = [...info.fileList];
      newFileList = newFileList.map((file) => {
        if (file.response) {
          file.url = file.response.url; // Backend should return the uploaded image URL
        }
        return file;
      });
      setFileList(newFileList);
    },
    customRequest: ({ file, onSuccess }: any) => {
      setTimeout(() => {
        onSuccess("ok"); // Simulate successful upload
        message.success(`${file.name} uploaded successfully`);
      }, 500); // Simulated delay for upload
    },
  };

  return (
    <Modal
      title="Add Product"
      visible={isModalOpen}
      onCancel={() => closeModal(false)}
      footer={null}
      width="80%" // Wider modal on mobile/tablet
    >
      <Form
        form={form} // Attach the form instance
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Upload Image"
          name="images"
          rules={[{ required: true, message: "Please select an image" }]}
        >
          <Upload {...uploadProps} listType="picture" multiple>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input product name" }]}
            >
              <Input placeholder="Product name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please input product price" },
              ]}
            >
              <Input placeholder="Product price" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="stockQuantity"
              label="Stock Quantity"
              rules={[
                { required: true, message: "Please input stock quantity" },
              ]}
            >
              <Input placeholder="Stock Quantity" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select category">
                {categories?.map((category: string) => (
                  <Select.Option key={category} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="isStock"
              label="Status"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select placeholder="Select stock status">
                <Select.Option value="true">In stock</Select.Option>
                <Select.Option value="false">Out of stock</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Add the Ratings field here */}
          <Col xs={24} md={12}>
            <Form.Item
              name="ratings"
              label="Ratings"
              rules={[
                {
                  required: true,
                  message: "Please input product ratings (0-5)",
                },
              ]}
            >
              <Input placeholder="Product ratings (0-5)" type="number" min={0} max={5} step={0.1}/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Product description" />
        </Form.Item>

        {/* Wrap Button in a div or Row to ensure proper placement */}
        <div style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductAddOrEdit;
