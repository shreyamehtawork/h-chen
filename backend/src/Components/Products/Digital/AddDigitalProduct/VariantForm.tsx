import React, { useState } from "react";
import CommonCardHeader from "@/CommonComponents/CommonCardHeader";
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
  Row,
  Col,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "reactstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { LuImagePlus, LuImageOff } from "react-icons/lu";
import MultiInputField from "./MultiInputField";
import NutritionalFactField from "./NutritionalFactField";
import { uploadMultipleNewFiles, removeFile } from "@/lib/actions/fileUploads"; // Assuming these functions are available
import { Loader } from "react-feather";

interface Variant {
  flavor: string;
  images: string[];
  stock: number;
  form: "tablet" | "powder" | "liquid";
  netQuantity: string;
  nutritionFacts: string[];
  allergens?: string[];
  servingSize: string;
}

const VariantForm = ({
  isSingleVariantProduct,
  variantProps,
  handleVariantChange,
}: {
  isSingleVariantProduct: boolean;
  variantProps: {
    variants: Variant[];
    setVariants: any;
    newVariant: Variant;
    setNewVariant: any;
    imagePreviews: string[];
    setImagePreviews: any;
    errors: any;
    setErrors: any;
    isUploading: boolean;
    setIsUploading: any;
  };
  handleVariantChange: (field: string, value: any) => void;
}) => {
  const {
    variants,
    setVariants,
    newVariant,
    setNewVariant,
    imagePreviews,
    setImagePreviews,
    errors,
    setErrors,
    isUploading,
    setIsUploading,
  } = variantProps;
  const [open, setOpen] = useState<string | null>(null);
  const [editingFlavor, setEditingFlavor] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [editingStock, setEditingStock] = useState<{
    index: number;
    value: number;
  } | null>(null);

  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const handleAddVariant = () => {
    const newErrors: { [key: string]: boolean } = {};
    // Remove flavor validation if single variant
    if (!isSingleVariantProduct && !newVariant.flavor) newErrors.flavor = true;
    if (!newVariant.stock) newErrors.stock = true;
    if (!newVariant.form) newErrors.form = true;
    if (!newVariant.netQuantity) newErrors.netQuantity = true;
    if (!newVariant.servingSize) newErrors.servingSize = true;
    if (newVariant.nutritionFacts.length === 0) newErrors.nutritionFacts = true;
    if (newVariant.images.length === 0) newErrors.images = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const variantToAdd = {
      ...newVariant,
      flavor: isSingleVariantProduct ? "none" : newVariant.flavor,
    };

    if (isSingleVariantProduct) {
      setVariants([variantToAdd]); // Replace existing variants with new one
    } else {
      setVariants([...variants, variantToAdd]);
    }

    setNewVariant({
      flavor: "",
      images: [],
      stock: 0,
      form: "tablet",
      netQuantity: "0",
      nutritionFacts: [],
      allergens: [],
      servingSize: "",
    });
    setImagePreviews([]);
    setErrors({});
  };

  const handleDeleteVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, .gif";
    input.multiple = true;

    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = Array.from(target.files || []);

      if (files.length > 0) {
        setIsUploading(true);
        const imagesFormData = new FormData();
        files.forEach((file) => {
          imagesFormData.append("files", file);
        });

        const imagesUrl = (await uploadMultipleNewFiles(
          imagesFormData
        )) as string[];

        if (!imagesUrl.length) {
          setIsUploading(false);
          return alert("Images upload failed. Please try again later.");
        }
        // console.log("imagesUrl: ", imagesUrl);
        let nonNullImages = imagesUrl.filter((image: any) => image !== null);
        setNewVariant((prev: any) => ({
          ...prev,
          images: [...prev.images, ...nonNullImages],
        }));

        setImagePreviews((prev: any) => [...prev, ...nonNullImages]);
        setIsUploading(false);
      }
    };

    input.click();
  };

  const handleRemoveImage = async (imageToRemove: string) => {
    const success = await removeFile(imageToRemove);

    if (success) {
      setNewVariant((prev: any) => {
        const updatedImages = prev.images.filter(
          (image: any) => image !== imageToRemove
        );

        return {
          ...prev,
          images: updatedImages,
        };
      });

      setImagePreviews((prev: any) =>
        prev.filter((image: any) => image !== imageToRemove)
      );
    } else {
      alert("Image removal failed. Please try again later.");
    }
  };

  const handleFlavorEdit = (index: number, newFlavor: string) => {
    setVariants(
      variants.map((variant, i) =>
        i === index ? { ...variant, flavor: newFlavor } : variant
      )
    );
  };

  const handleStockEdit = (index: number, newStock: number) => {
    setVariants(
      variants.map((variant, i) =>
        i === index ? { ...variant, stock: newStock } : variant
      )
    );
  };

  return (
    <Card>
      {variants.length > 0 && (
        <>
          <CommonCardHeader
            title={
              !isSingleVariantProduct ? "Added Variants" : "Product Variant"
            }
          />
          <div
            className=""
            style={{
              padding: "0 30px",
              // paddingBottom: "0px",
            }}
          >
            <Accordion
              // open={open ? open : "false"}
              open={(isSingleVariantProduct && open) || open ? open : "false"}
              toggle={toggle}
              className={!isSingleVariantProduct ? "" : "pb-4"}
            >
              {variants.map((variant, index) => (
                <AccordionItem key={index}>
                  <AccordionHeader targetId={`${index}`}>
                    {!isSingleVariantProduct && variant.flavor + " - "}
                    {variant.form} - {variant.netQuantity}
                  </AccordionHeader>
                  <AccordionBody accordionId={`${index}`}>
                    <div className="d-flex align-items-center justify-content-between mb-2 ">
                      <div className="w-75">
                        {!isSingleVariantProduct && (
                          <div className="mb-2">
                            <strong>Flavor:</strong>{" "}
                            {editingFlavor?.index === index ? (
                              <div className="d-inline-flex align-items-center gap-2 ms-2">
                                <Input
                                  type="text"
                                  value={editingFlavor.value}
                                  onChange={(e) =>
                                    setEditingFlavor({
                                      index,
                                      value: e.target.value,
                                    })
                                  }
                                  onBlur={() => {
                                    handleFlavorEdit(
                                      index,
                                      editingFlavor.value === ""
                                        ? "none"
                                        : editingFlavor.value
                                    );
                                    setEditingFlavor(null);
                                  }}
                                  onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                      handleFlavorEdit(
                                        index,
                                        editingFlavor.value === ""
                                          ? "none"
                                          : editingFlavor.value
                                      );
                                      setEditingFlavor(null);
                                    }
                                  }}
                                  className="d-inline-block w-50"
                                />
                                <span
                                  onClick={() => {
                                    handleFlavorEdit(
                                      index,
                                      editingFlavor.value === ""
                                        ? "none"
                                        : editingFlavor.value
                                    );
                                    setEditingFlavor(null);
                                  }}
                                  style={{ cursor: "pointer" }}
                                  className="ms-2 text-success"
                                >
                                  (save)
                                </span>
                                <span
                                  onClick={() => setEditingFlavor(null)}
                                  style={{ cursor: "pointer" }}
                                  className="ms-2 text-danger"
                                >
                                  (cancel)
                                </span>
                              </div>
                            ) : (
                              <span>
                                {variant.flavor}{" "}
                                <span
                                  onClick={() =>
                                    setEditingFlavor({
                                      index,
                                      value: variant.flavor,
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                  className="ms-2 text-primary"
                                >
                                  (click to edit)
                                </span>
                              </span>
                            )}
                          </div>
                        )}
                        <strong>Stock:</strong>{" "}
                        {editingStock?.index === index ? (
                          <div className="d-inline-flex align-items-center gap-2 ms-2">
                            <Input
                              type="number"
                              value={editingStock.value}
                              onChange={(e) =>
                                setEditingStock({
                                  index,
                                  value: parseInt(e.target.value),
                                })
                              }
                              onBlur={() => {
                                handleStockEdit(index, editingStock.value || 0);
                                setEditingStock(null);
                              }}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleStockEdit(
                                    index,
                                    editingStock.value || 0
                                  );
                                  setEditingStock(null);
                                }
                              }}
                              className="d-inline-block w-50"
                            />
                            <span
                              onClick={() => {
                                handleStockEdit(index, editingStock.value || 0);
                                setEditingStock(null);
                              }}
                              style={{ cursor: "pointer" }}
                              className="ms-2 text-success"
                            >
                              (save)
                            </span>
                            <span
                              onClick={() => setEditingStock(null)}
                              style={{ cursor: "pointer" }}
                              className="ms-2 text-danger"
                            >
                              (cancel)
                            </span>
                          </div>
                        ) : (
                          <span>
                            {variant.stock}{" "}
                            <span
                              onClick={() =>
                                setEditingStock({
                                  index,
                                  value: variant.stock,
                                })
                              }
                              style={{ cursor: "pointer" }}
                              className="ms-2 text-primary"
                            >
                              (click to edit)
                            </span>
                          </span>
                        )}{" "}
                        <br />
                        <strong>Form:</strong> {variant.form} <br />
                        <strong>Net Quantity:</strong> {variant.netQuantity}{" "}
                        <br />
                        <strong>Serving Size:</strong> {variant.servingSize}{" "}
                        <br />
                        <strong>Nutrition Facts:</strong>{" "}
                        {variant.nutritionFacts.join(", ")} <br />
                        <strong>Allergens:</strong>{" "}
                        {variant.allergens?.join(", ")} <br />
                        {/* <strong>Images:</strong> {variant.images.join(", ")} */}
                        <div className="image-previews mt-2">
                          <strong>Images:</strong>
                          <Row>
                            {variant.images.map((src, index) => (
                              <Col xs="4" key={index} className="mb-4">
                                <div className="d-flex align-items-center">
                                  <img
                                    src={src}
                                    alt="Preview"
                                    className="img-thumbnail "
                                    style={{
                                      width: "100%",
                                      aspectRatio: 1,
                                      objectFit: "cover",
                                      objectPosition: "top",
                                    }}
                                  />
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </div>
                      <Button
                        color="danger"
                        size="sm"
                        className="dangerBtn px-3 py-2"
                        onClick={() => handleDeleteVariant(index)}
                      >
                        <AiOutlineDelete size={20} />
                      </Button>
                    </div>
                  </AccordionBody>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </>
      )}
      {(!isSingleVariantProduct || variants.length === 0) && (
        <>
          <CommonCardHeader
            title={isSingleVariantProduct ? "Product Variant" : "Add Variants"}
          />
          <CardBody className="pt-0">
            <div className="digital-add needs-validation d-flex flex-column">
              {!isSingleVariantProduct && (
                <FormGroup>
                  <Label className="col-form-label pt-0">Flavor</Label>
                  <Input
                    type="text"
                    name="flavor"
                    value={newVariant.flavor}
                    onChange={(e) =>
                      handleVariantChange("flavor", e.target.value)
                    }
                    invalid={errors.flavor}
                    required
                  />
                  {errors.flavor && (
                    <FormFeedback>Flavor is required</FormFeedback>
                  )}
                </FormGroup>
              )}
              <FormGroup>
                <Label className="col-form-label pt-0">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={newVariant.stock}
                  onChange={(e) => handleVariantChange("stock", e.target.value)}
                  invalid={errors.stock}
                  required
                />
                {errors.stock && <FormFeedback>Stock is required</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label pt-0">Form</Label>
                <Input
                  type="select"
                  name="form"
                  value={newVariant.form}
                  onChange={(e) => handleVariantChange("form", e.target.value)}
                  invalid={errors.form}
                  required
                >
                  <option value="tablet">Tablet</option>
                  <option value="powder">Powder</option>
                  <option value="liquid">Liquid</option>
                </Input>
                {errors.form && <FormFeedback>Form is required</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label pt-0">
                  Net Quantity (e.g. 100g, 2l, 200 tablets etc.)
                </Label>
                <Input
                  type="text"
                  name="netQuantity"
                  value={newVariant.netQuantity}
                  onChange={(e) =>
                    handleVariantChange("netQuantity", e.target.value)
                  }
                  invalid={errors.netQuantity}
                  required
                />
                {errors.netQuantity && (
                  <FormFeedback>Net Quantity is required</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Label className="col-form-label pt-0">
                  Serving Size (e.g. 3 tablets/day, 2 scoops daily etc.)
                </Label>
                <Input
                  type="text"
                  name="servingSize"
                  value={newVariant.servingSize}
                  onChange={(e) =>
                    handleVariantChange("servingSize", e.target.value)
                  }
                  invalid={errors.servingSize}
                  required
                />
                {errors.servingSize && (
                  <FormFeedback>Serving Size is required</FormFeedback>
                )}
              </FormGroup>
              <NutritionalFactField
                label="Nutrition Facts (e.g. Carbs : 10g, Protein : 12%, etc.)"
                nutritionFacts={newVariant.nutritionFacts}
                handleArrayChange={handleVariantChange}
              />
              {errors.nutritionFacts && (
                <FormFeedback className="d-block">
                  Nutrition Facts are required
                </FormFeedback>
              )}
              <MultiInputField
                label="Allergens"
                items={newVariant.allergens}
                handleArrayChange={handleVariantChange}
                fieldName="allergens"
              />
              <FormGroup>
                <Label className="col-form-label pt-0">Images</Label>
                <Button
                  type="button"
                  color="primary"
                  onClick={handleImageUpload}
                  disabled={isUploading}
                  className="w-fit h-fit p-2 px-3 cursor-pointer bg-blue-100 hover:bg-blue-200 d-flex align-items-center"
                >
                  <LuImagePlus size={20} className=" m-r-10" />
                  Add Images
                  {isUploading && <Loader size={20} className="ms-2" />}
                </Button>
                <div className="image-previews mt-5">
                  <Row>
                    {imagePreviews.map((src, index) => (
                      <Col xs="6" key={index} className="mb-4">
                        <div className="d-flex align-items-center">
                          <img
                            src={src}
                            alt="Preview"
                            className="img-thumbnail me-2"
                            style={{
                              width: "80%",
                              aspectRatio: 1,
                              objectFit: "cover",
                              objectPosition: "top",
                            }}
                          />
                          <Button
                            type="button"
                            onClick={() => handleRemoveImage(src)}
                            className="w-fit h-fit p-2 text-black bg-red-100 hover:bg-red-200"
                          >
                            <LuImageOff size={16} />
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
                {errors.images && (
                  <FormFeedback className="d-block">
                    Images are required
                  </FormFeedback>
                )}
              </FormGroup>
              <Button
                color="primary"
                size="sm"
                className="px-3 py-3 d-flex justify-content-center align-items-center text-center"
                style={{ fontSize: "0.9rem" }}
                onClick={handleAddVariant}
                disabled={isSingleVariantProduct && variants.length > 0}
              >
                <FaPlus size={20} className="me-2" />
                {isSingleVariantProduct ? "Save Variant" : "Add Variant"}
              </Button>
            </div>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default VariantForm;
