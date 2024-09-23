import { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Popconfirm,
  Select,
  Upload,
  Input,
  Row,
  Col,
  message,
} from "antd";
import CustomBreadCumb from "@/components/ui/BreadCumb";
import {
  useDeleteAProductMutation,
  useGetAllProductsQuery,
  useUpdateAProductMutation,
} from "@/redux/features/product/productApi";
import { UploadOutlined } from "@ant-design/icons";
import generateCleanObject from "@/utils/generateCleanObject";
import { TProduct } from "@/types";

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

const { Option } = Select;

const BreadCumbItems = [
  {
    title: "Products",
  },
];

const Products = () => {
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(10); // State for page size
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Currently selected product for editing
  const [fileList, setFileList] = useState<any[]>([]); // State for uploaded files
  const { data, isFetching } = useGetAllProductsQuery({
    page,
    limit,
  });
  const [updateAProduct] = useUpdateAProductMutation();
  const [deleteAProduct] = useDeleteAProductMutation();
  const [form] = Form.useForm(); // Create form instance

  const products = data?.data;
  const categories = ["bike", "camp-hike", "ski & snowboard", "climb"]; // Mock categories, replace with actual API call

  // Open Modal for editing product
  const showEditModal = (product: any) => {
    setSelectedProduct(product); // Set selected product data
    setIsModalOpen(true); // Open the modal
    form.setFieldsValue({
      // Set form values dynamically when modal opens
      id: product?._id,
      name: product?.name,
      price: product?.price,
      stockQuantity: product?.stockQuantity,
      description: product?.description,
      category: product?.category,
      status: product?.isStock ? "In stock" : "Out of stock",
    });
    setFileList(
      product?.images.map((img: any, idx: number) => ({
        uid: idx,
        name: img.alt,
        status: "done",
        url: img.url,
      })) || []
    );
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Clear selected product after closing
    setFileList([]); // Reset file list
    form.resetFields(); // Reset form fields when closing the modal
  };

  // Handle form submission for editing
  const handleFinish = async (formData: FormData) => {
    const { id, status, ...productData } = formData;

    // Clean the product data
    const cleanObject:Partial<TProduct> = generateCleanObject(productData);
    delete cleanObject.images;
    console.log(cleanObject);

    const images: File[] = [];
    const removedImages: File[] = [];

    // Collect valid images
    if (formData?.images?.fileList) {
      for (const fileWrapper of formData.images.fileList) {
        if (fileWrapper.originFileObj && fileWrapper.size) {
          images.push(fileWrapper.originFileObj);
        }
      }
    }

    if(formData?.images?.file && formData?.images?.file?.status === 'removed'){
      removedImages.push(formData?.images?.file?.url);
    }

    console.log('removed images=>', removedImages);
    
    // Prepare the FormData object
    const updatedProduct = new FormData();

    // Append JSON stringified cleanObject to preserve types
    updatedProduct.append("updatedValues", JSON.stringify(cleanObject));
    updatedProduct.append("removedImages", JSON.stringify(removedImages));

    // Append images
    if (images.length > 0) {
      images.forEach((image) => {
        updatedProduct.append("images", image); // Each file is appended under the 'images' key
      });
    }

    console.log("Form Data:", formData, updatedProduct, images, cleanObject);

    // Send the cleaned data and images to the backend
    await updateAProduct({
      productId: id,
      updatedProduct: updatedProduct,
    });

    // Close the modal after the update
    setIsModalOpen(false);
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

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "images",
      key: "images",
      render: (images: string) => (
        <img src={images[0]?.url} alt={images[0]?.alt} width="60px" />
      ),
    },
    {
      title: "Product ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "isStock",
      key: "isStock",
      render: (isStock: boolean) => (
        <Tag color={isStock ? "green" : "red"}>
          {isStock ? "In stock" : "Out of stock"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <>
          <Button type="link" onClick={() => showEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            okText="Yes"
            cancelText="No"
            onConfirm={()=> deleteAProduct(record?._id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleTableChange = (pagination: any) => {
    setPage(pagination.current); // Update page state
    setLimit(pagination.pageSize); // Update limit state
  };

  return (
    <>
      <CustomBreadCumb links={BreadCumbItems}></CustomBreadCumb>
      <Table
        dataSource={products}
        columns={columns}
        rowKey={(record) => record._id}
        loading={isFetching}
        pagination={{
          current: page,
          pageSize: limit,
          showSizeChanger: true,
          pageSizeOptions: ["10", "15", "20"],
          total: data?.totalProducts,
        }}
        onChange={handleTableChange}
      />

      {/* Modal for editing product */}
      <Modal
        title="Edit Product"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="50%"
      >
        <Form
          form={form} // Attach the form instance
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item label="Upload Image" name="images">
            <Upload {...uploadProps} listType="picture" maxCount={5} multiple={true}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="id" style={{ display: "none" }}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true }]}
                normalize={(value: string | number) =>
                  value ? Number(value) : 0
                } // Ensure number type
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Stock Quantity"
                name="stockQuantity"
                rules={[{ required: true }]}
                normalize={(value: string | number) =>
                  value ? Number(value) : 0
                } // Ensure number type
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Category"
                name="category"
                rules={[{ required: true }]}
              >
                <Select defaultActiveFirstOption={false}>
                  {categories.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true }]}
              >
                <Select defaultActiveFirstOption={false}>
                  <Option value="In stock">In stock</Option>
                  <Option value="Out of stock">Out of stock</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default Products;
