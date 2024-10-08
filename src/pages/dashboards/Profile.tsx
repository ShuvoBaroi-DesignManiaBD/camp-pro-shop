import { FiLogOut } from "react-icons/fi";
import { BiCamera } from "react-icons/bi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, Typography, Avatar, Upload, message } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentToken, selectCurrentUser, setUser, TAuthState } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import generateCleanObject from "@/utils/generateCleanObject";
import { useUpdateUserMutation, useUploadProfilePhotoMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

const { Title } = Typography;

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserData {
  name: string;
  profilePhoto: string;
  email: string;
  phone: string;
  address: Address;
  role: string;
}

const Profile = () => {
  const currentUser:TAuthState['user'] = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const [updateUser] = useUpdateUserMutation();
  const [uploadProfilePhoto] = useUploadProfilePhotoMutation();
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false); // Flag to track ongoing uploads
  const userId = currentUser?._id as string;
  const profilePhoto = currentUser?.photo ? currentUser?.photo?.replace("https:/", "https://") : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = async (formData: UserData) => {
    const updatedValues: any = generateCleanObject(formData);

    // const formDataWithFile = new FormData();
    // Object.keys(updatedValues).forEach((key) => {
    //   if (key !== "profilePhoto") {
    //     formDataWithFile.append(key, updatedValues[key]);
    //   }
    // });

    // if (fileList.length > 0) {
    //   formDataWithFile.append("profilePhoto", fileList[0].originFileObj);
    // }

    try {
      const res = await updateUser({ userId, updatedValues: updatedValues }).unwrap();
      
      dispatch(setUser({ user:res?.data, token }));
      console.log("response: ", res, updatedValues);
      setIsEditable(false);
      toast.success('Profile data updated successfully!')
    } catch (error) {
      console.error("Error updating user profile: ", error);
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleFileChange = async ({ fileList: newFileList }: any) => {
    // Prevent uploadProfilePhoto from being triggered multiple times
    if (isUploading || newFileList.length === 0) return;

    setFileList(newFileList);
    setIsUploading(true);  // Prevent multiple uploads at the same time

    try {
      const res:never|any = await uploadProfilePhoto({
        userId,
        file: newFileList[0]?.originFileObj,
        type: "profile",
      }).unwrap();
      const user = res?.data;
      dispatch(setUser({ user, token }));
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    } finally {
      setIsUploading(false); // Reset the flag once upload is done
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    onChange: handleFileChange,
    beforeUpload: (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG files!");
      }
      const isLt1M = file.size / 1024 / 1024 <= 1;
      if (!isLt1M) {
        message.error("Image must be smaller than 1MB!");
      }
      return isJpgOrPng && isLt1M;
    },
  };

  return (
    <Card 
    styles={{body:{padding: 0}}}
    className="bg-transparent border-none">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left Column - Avatar */}
        <div className="w-full md:w-1/4 flex flex-col justify-center items-center bg-white p-6 border-lg [&&_span]:!transform-none">
        <span className="relative"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        >
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              fontSize: "70px",
              verticalAlign: "middle",
              width: "100px",
              height: "100px",
              position: "relative",
              border: "none",
            }}
            src={profilePhoto}
            className="!relative cursor-pointer flex items-center justify-center content-center"
          >
            {!currentUser?.photo && currentUser?.name?.trim()[0]}
          </Avatar>
            {isHover && (
              <Upload {...uploadProps} maxCount={1} accept=".png,.jpg,.jpeg,.webp" className="!z-50 absolute text-white text-center rounded-full top-0 left-0 !w-full !h-full bg-black bg-opacity-70 content-center">
                <div className="w-full h-full flex flex-col items-center justify-center content-center">
                  <BiCamera size={40} />
                  <Button type="link" className="flex flex-col items-center justify-center text-white">
                    Upload
                  </Button>
                </div>
              </Upload>
            )}
        </span>
          <Typography.Text className="font-[650] mt-4 text-lg text-primary/80">
            {currentUser?.name}
          </Typography.Text>
          <Typography.Text className="text font-normal capitalize text-gray-400">
            {currentUser?.role}
          </Typography.Text>
          <Button
            type="default"
            size="middle"
            icon={<FiLogOut />}
            danger
            className="mt-8 hover:!bg-red-400 hover:!text-white"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-3/4 bg-white p-6">
          <Title level={4} className="pb-4 border-b">
            Profile
          </Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-[repeat(3,_minmax(150px,_1fr))] mt-4"
          >
            {/* Name */}
            <div className="form-group">
              <label className="font-semibold">Name</label>
              <Input
                {...register("name")}
                name="name"
                size="large"
                readOnly={!isEditable}
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                defaultValue={currentUser?.name}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("name", e.target.value)}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="font-semibold">Email</label>
              <Input
                {...register("email")}
                name="email"
                size="large"
                readOnly
                className="mt-1 bg-gray-100 cursor-not-allowed"
                defaultValue={currentUser?.email}
                onChange={(e) => setValue("email", e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="font-semibold">Phone</label>
              <Input
                {...register("phone")}
                name="phone"
                readOnly={!isEditable}
                size="large"
                className={`mt-1 ${errors.phone ? "border-red-500" : ""}`}
                defaultValue={currentUser?.phone}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("phone", e.target.value)}
              />
              {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
            </div>

            {/* Address Fields */}
            <Title level={4} className="col-span-2 md:col-span-full mt-6 pb-4 border-b">
              Address
            </Title>
            {/* Street */}
            <div className="form-group">
              <label className="font-semibold">Street</label>
              <Input
                {...register("address.street")}
                name="address.street"
                readOnly={!isEditable}
                size="large"
                className={`mt-1 ${errors.address?.street ? "border-red-500" : ""}`}
                defaultValue={currentUser?.address?.street}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("address.street", e.target.value)}
              />
              {errors.address?.street && <span className="text-red-500">{errors.address?.street.message}</span>}
            </div>

            {/* City */}
            <div className="form-group">
              <label className="font-semibold">City</label>
              <Input
                {...register("address.city")}
                name="address.city"
                readOnly={!isEditable}
                size="large"
                className={`mt-1 ${errors.address?.city ? "border-red-500" : ""}`}
                defaultValue={currentUser?.address?.city}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("address.city", e.target.value)}
              />
              {errors.address?.city && <span className="text-red-500">{errors.address?.city.message}</span>}
            </div>

            {/* State */}
            <div className="form-group">
              <label className="font-semibold">State</label>
              <Input
                {...register("address.state")}
                name="address.state"
                readOnly={!isEditable}
                size="large"
                className={`mt-1 ${errors.address?.state ? "border-red-500" : ""}`}
                defaultValue={currentUser?.address?.state}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("address.state", e.target.value)}
              />
              {errors.address?.state && <span className="text-red-500">{errors.address?.state.message}</span>}
            </div>

            {/* Zip Code */}
            <div className="form-group">
              <label className="font-semibold">Zip Code</label>
              <Input
                {...register("address.zipCode")}
                name="address.zipCode"
                readOnly={!isEditable}
                size="large"
                className={`mt-1 ${errors.address?.zipCode ? "border-red-500" : ""}`}
                defaultValue={currentUser?.address?.zipCode}
                onClick={() => setIsEditable(true)}
                onChange={(e) => setValue("address.zipCode", e.target.value)}
              />
              {errors.address?.zipCode && (
                <span className="text-red-500">{errors.address?.zipCode.message}</span>
              )}
            </div>

            {/* Edit and Save Button */}
            {isEditable ? (
              <div className="w-full flex gap-3 col-span-2">
                <button type="submit" className="mt-4 self-center py-2.5 secondaryButton w-full">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditable(false)}
                  className="w-full mt-4 self-center py-2.5 secondaryButtonOutlined border-gray-300 !text-red-500 hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button className="mt-4 self-center primaryButtonOutlined bg-secondaryExtraLight py-2.5  border-gray-300 text-primary hover:bg-secondary hover:text-white" onClick={handleEdit}>
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
