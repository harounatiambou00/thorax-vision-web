import React from "react";
import { RayXImageType } from "./DiagnosticPage";
import {
  Button,
  CardMedia,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { CiImageOn } from "react-icons/ci";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiEdit } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { ErrorsType } from "./types";

type Props = {
  images: RayXImageType[];
  setImages: React.Dispatch<React.SetStateAction<RayXImageType[]>>;
  errors: ErrorsType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
};
const ImagesSections = ({ images, setImages, errors, setErrors }: Props) => {
  const imageToBeAddedInputRef = React.useRef<HTMLInputElement>(null);
  const [imageToBeAdded, setImageToBeAdded] = React.useState<RayXImageType>({
    id: 0,
    base64: null,
    file: null,
  });
  const updateImageInputRef = React.useRef<HTMLInputElement>(null);
  const [imageBeingUpdatedId, setImageBeingUpdatedId] = React.useState<
    number | null
  >(null);

  return (
    <div className="h-fit">
      <h1 className="text-3xl font-kalnia font-medium mb-2">
        Imagerie medicale
      </h1>
      <div
        className={
          errors.imageError
            ? "border-2 border-red-500 border-dashed rounded-lg h-fit"
            : "border-2 border-gray-500 border-dashed rounded-lg h-fit"
        }
      >
        {imageToBeAdded.base64 && imageToBeAdded.file ? (
          <div className="h-96 w-full relative">
            <IconButton
              color="error"
              size="small"
              className="absolute top-2 right-10 bg-red-100"
              onClick={() =>
                setImageToBeAdded({ id: 0, base64: null, file: null })
              }
            >
              <MdClose />
            </IconButton>
            <IconButton
              color="success"
              size="small"
              className="absolute top-2 right-2 bg-green-100"
              onClick={() => {
                setImages([...images, imageToBeAdded]);
                setImageToBeAdded({
                  id: images.length + 1,
                  base64: null,
                  file: null,
                });
              }}
            >
              <MdCheck />
            </IconButton>
            <CardMedia
              component="img"
              src={imageToBeAdded.base64}
              alt={imageToBeAdded.file.name}
              className="h-full w-full rounded-t-lg"
            />
          </div>
        ) : (
          <div className="h-96 w-full flex flex-col items-center justify-center">
            <h1 className="font-rubik text-xl dont-medium align-middle">
              Ajouter une image X-Ray des poumons du patient.
              <span className="text-red-600">*</span>
            </h1>
            <small>Le ficher ne doit pas depasser 1 Mo.</small>
            <CiImageOn className="text-8xl mt-3" />
            <input
              type="file"
              className="hidden"
              ref={imageToBeAddedInputRef}
              onChange={(e) => {
                if (e.currentTarget && e.currentTarget.files) {
                  let file = e.currentTarget.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageToBeAdded((current) => ({
                          ...current,
                          file: file,
                        }));
                        setImageToBeAdded((current) => ({
                          ...current,
                          base64: reader.result as string,
                        }));
                      };
                    };
                  }
                }
              }}
            />

            <Button
              size="small"
              className="mt-2 normal-case font-rubik font-light"
              onClick={() => imageToBeAddedInputRef.current?.click()}
            >
              Téléverser une image
            </Button>
          </div>
        )}
        <div className="h-40 w-full bg-white border-t">
          {images.length <= 0 ? (
            <div className="w-full h-full flex items-center justify-center text-red-500">
              Aucune image X-Ray ajoutee pour le moment.
            </div>
          ) : (
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              className="w-full h-full bg-gray-50 p-2"
            >
              {images &&
                images.map((image) => {
                  return image.base64 && image.file ? (
                    <SwiperSlide
                      className="rounded-md bg-white bg-transparent drop-shadow-md h-full overflow-hidden"
                      key={image.id}
                    >
                      <ImageListItem className="h-full">
                        <img
                          src={image.base64}
                          alt={image.file.name}
                          className="h-36"
                        />
                        <ImageListItemBar
                          className="bg-transparent"
                          position="top"
                          actionIcon={
                            <div className="w-full flex justify-between">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => {
                                  setImages(
                                    images.filter((i) => i.id !== image.id)
                                  );
                                }}
                                className="bg-red-100"
                              >
                                <MdClose />
                              </IconButton>
                            </div>
                          }
                          actionPosition="right"
                        />
                        <ImageListItemBar
                          className="bg-transparent"
                          position="bottom"
                          actionIcon={
                            <div className="w-full flex justify-between">
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setImageBeingUpdatedId(image.id);
                                  updateImageInputRef.current?.click();
                                }}
                                className="bg-gray-100 text-gray-700"
                              >
                                <MdEdit />
                              </IconButton>
                            </div>
                          }
                          actionPosition="right"
                        />
                      </ImageListItem>
                    </SwiperSlide>
                  ) : undefined;
                })}
            </Swiper>
          )}
          <input
            className="hidden"
            accept="image/*"
            type="file"
            ref={updateImageInputRef}
            onChange={(e) => {
              if (e.currentTarget && e.currentTarget.files) {
                let file = e.currentTarget.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                      setImages(
                        images.map((i) => {
                          if (i.id === imageBeingUpdatedId) {
                            i.file = file;
                            i.base64 = reader.result as string;
                          }
                          return i;
                        })
                      );
                    };
                  };
                }
              }
              setImageBeingUpdatedId(null);
            }}
          />
        </div>
      </div>
      {errors.imageError && (
        <div className="mt-2 text-red-600">
          Vous devez choisir au moins une image x-ray.
        </div>
      )}
    </div>
  );
};

export default ImagesSections;
