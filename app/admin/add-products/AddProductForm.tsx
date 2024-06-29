"use client";

import Heading from "@/app/components/Heading";
import TextArea from "@/app/components/inputs/TextArea";
import CustomerCheckbox from "@/app/components/inputs/customeCheckbox";
import Input from "@/app/components/inputs/input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../../utilities/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import { colors } from "@/utilities/colors";
import SelectColor from "@/app/components/inputs/selectColor";
import Button from "@/app/components/button";
import toast from "react-hot-toast";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { rejects } from "assert";
import { resolve } from "path";
import { error } from "console";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
      price: "",
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    //upload images to fb
    //save product to mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image");
    }
    const handleImageUploads = async () => {
      toast("Creating Product, Please Wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);

            const uploadTask = uploadBytesResumable(storageRef, item.image);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("image can not be uplaod ", error);
                  reject(error);
                  // Handle unsuccessful uploads
                },
                () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL });
                      console.log("File available at", downloadURL);
                      resolve();
                      // setIsLoading(false);
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (err) {
        setIsLoading(false);
        console.log("Error handling image uploads", err);
        return toast.error("Error handling image uploads");
      }
    };
    await handleImageUploads();
    const productData = { ...data, images: uploadedImages };
    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product is successfully created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        return toast.error(
          "Something went wrong when saving the product to db!",
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(productData);
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
  return (
    <>
      <Heading title="Add a Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomerCheckbox
        id="inStock"
        register={register}
        label="this Product is inStock "
      />
      <div className="w-full font-medium ">
        <div className="mb-2 font-semibold ">Select a Category</div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select the available Product colors and upload thier images.
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        lable={isLoading ? "Loading..." : "Add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
