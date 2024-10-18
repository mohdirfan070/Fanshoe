import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import ChangeProduct from "./ChangeProduct";


export default function AddProduct() {
  const [updateproduct, setUpdateProduct] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const notify = (msg, type, theme, autoClose) => {
    toast(msg, { type, theme, autoClose });
  };

  const [inpData , setInpData ] = useState({
    id:"",
    title:"",
    category:"",
    description:"",
    price:0,
    discount:0,
    stock:0,
    unit:"",
    active:false,
})


const handleChange = (e)=>{
  setInpData({...inpData,[e.target.name]:e.target.value});
}



  const [images, setImages] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  // const [imageData, setImageData] = useState([]);

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    // setImageData(...e.target.files);
    setImages({ ...images, [e.target.name]: e.target.value });
    //  console.log(images) ;
  };

  const Submit = async (data) => {
    // console.log(data);
    // console.log(images);
    // const imagesForm = new FormData();
    // imagesForm.append("image", imageData);
    try {
      const res2 = await axios.post("/apiv1/addproductinfo", { data } , { withCredentials: true });
     
      if (res2.data.status) {
        notify(res2.data.msg, "success", "light", 2000);
      } else {
        notify(res2.data.reason, "error", "light", 2000);
      }
    } catch (err) {
      // console.error("Error uploading image: ", err);
      notify("Somthing Went Wrong", "error", "light", 2000);
    }
  };

  return (
    <section className="right-div min-h-[795px]    z-[555] flex-auto rounded-lg min-w-[320px] max-w-[900px] bg-slate-100">
      <div className="p-4 sticky top-0  bg-slate-100  border-b-2 drop-shadow-sm flex items-center w-full justify-between">
             <p className=" text-xl font-medium font3">
             {
        updateproduct ? <>Update Product </> : <>Add Product</>
      }      

        </p>

        <section className="flex gap-x-1">
          {!updateproduct ? (
            <>
              <button
                onClick={handleSubmit(Submit)}
                className="text-white bg-red-600 py-2 px-4 rounded-md font2 font-medium "
              >
                Add
              </button>
              <button
                onClick={() => setUpdateProduct(!updateproduct)}
                className="bg-blue-600 py-2 px-4 rounded-md text-white"
              >
               Update Product Info{" "}
                <img
                  className="inline-block backdrop-invert-0 font2 "
                  src="./src/assets/editIcon.svg"
                  alt="EditIcon"
                />{" "}
              </button>
            </>
          ) : (
            <>
            
            <button className="text-white bg-red-600 py-2 px-4 rounded-md font2 font-medium ">
              Update
            </button>
            <button
                onClick={() => setUpdateProduct(!updateproduct)}
                className=" bg-blue-600 py-2 px-4 rounded-md text-white font-base "
              >
                  Add Product
                </button>
            </>
          )}
        </section>
      </div>

          
      {updateproduct ? (
        <ChangeProduct />
      ) : (
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <section>
            <div className="h-full w-full flex flex-wrap border-b-2">
              <section>
                <p className="text-blue-700 p-2 font-medium ">Product Info</p>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="name"
                  >
                    {errors.id ? (
                      <span className="text-red-600">Invalid Id</span>
                    ) : (
                      "Id"
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("id", {
                      required: true,
                      pattern: /^[\d]+$/,
                      minLength: 4,
                      maxLength: 8,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="id"
                    maxLength={8}
                    id="id"
                    placeholder="ex:465487"
                  />
                </div>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="name"
                  >
                    {errors.title ? (
                      <span className="text-red-600">Invalid Title</span>
                    ) : (
                      <>Title</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("title", {
                      required: true,
                      maxLength: 25,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="title"
                    id="title"
                    maxLength={25}
                    placeholder="Product Name"
                  />
                </div>

                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="category"
                  >
                    {errors.category ? (
                      <span className="text-red-600">Invalid category</span>
                    ) : (
                      <>Cateory</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("category", {
                      required: true,
                    })} onChange={handleChange}
                    title="PLease Follow the Given Syntax"
                    className="p-4 min-w-[70%] rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Sports, Casual,..."
                  />
                </div>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="description"
                  >
                    {errors.description ? (
                      <span className="text-red-600">Invalid Description</span>
                    ) : (
                      <>Description</>
                    )}
                  </label>{" "}
                  <br />
                  <textarea
                    {...register("description", {
                      required: true,
                      maxLength: 150,
                    })} onChange={handleChange}
                    cols={35}
                    rows={3}
                    aria-disabled
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400 "
                    type="text"
                    name="description"
                    id="description"
                    placeholder="About Product"
                  />
                </div>
              </section>
              <section>
                <p className="text-blue-700 p-2 font-medium ">
                  Pricing & Discount
                </p>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="price"
                  >
                    {errors.price ? (
                      <span className="text-red-600">Invalid Price</span>
                    ) : (
                      <>Price</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("price", {
                      pattern: /^[\d]+$/,
                      min: 10,
                      required: true,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="price"
                    id="price"
                    placeholder="In Rupees"
                  />
                </div>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="discount"
                  >
                    {errors.discount ? (
                      <span className="text-red-600">Invalid Discount</span>
                    ) : (
                      <>Discount</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("discount", {
                      pattern: /^[\d]+$/,
                      required: true,
                      maxLength: 2,
                      min: 10,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="discount"
                    id="discount"
                    placeholder="ex 36%"
                  />
                </div>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="stock"
                  >
                    {errors.stock ? (
                      <span className="text-red-600">Invalid Stock</span>
                    ) : (
                      <>Stock</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("stock", {
                      required: true,
                      pattern: /^[\d]+$/,
                      min: 1,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="stock"
                    id="stock"
                    placeholder="ex: 25"
                  />
                </div>
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none"
                    htmlFor="unit"
                  >
                    {errors.unit ? (
                      <span className="text-red-600">Invalid Unit</span>
                    ) : (
                      <>Unit</>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("unit", {
                      required: true,
                    })} onChange={handleChange}
                    className="p-4 rounded-lg text-lg font2 font-semibold   outline-none hover:outline-slate-300 focus:outline-blue-400"
                    type="text"
                    name="unit"
                    id="unit"
                    placeholder="ex:pair,combo"
                  />
                </div>
              </section>
            </div>
            <div className="h-full w-full flex flex-wrap border-b-2">
              <section>
                <p className="text-blue-700 px-2 pt-1 font-medium ">Status</p>
                <div className="name-div p-3 ">
                  <select
                    id="status"
                    {...register("status", { required: true })} onChange={handleChange}
                    className="p-3  outline-none hover:outline-slate-300 focus:outline-blue-400 font2 rounded bg-slate-50"
                  >
                    <option value="true">Active</option>
                    <option value="false">InActive</option>
                  </select>
                </div>
              </section>
            </div>
          </section>

          <section>
            <div className="h-full w-full  ">
              <section className="flex items-center">
                <p className="text-blue-700 px-2 pt-2 font-medium ">
                  Product Images{" "}
                  {errors.image1 ? (
                    <span className="text-red-600">
                      Minimum One Image1 is required!
                    </span>
                  ) : (
                    ""
                  )}
                </p>{" "}
              </section>
              <section className=" flex flex-wrap gap-x-2">
                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none hover:opacity-70"
                    htmlFor="image1"
                  >
                    {images.image1 ? (
                      images.image1
                    ) : (
                      <>
                        Image 1
                        <img
                          className="inline-block"
                          src="./src/assets/uploadIcon.svg"
                          alt="uploadIcon"
                        />{" "}
                      </>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("image1")}
                    onChange={handleFileChange}
                    className="p-4 hidden rounded-lg text-lg font2 font-semibold  "
                    type="file"
                    multiple
                    accept="image/svg,image/jpeg"
                    name="image1"
                    id="image1"
                    placeholder="Image 1"
                  />
                </div>

                <div className="name-div p-3  ">
                  <label
                    className="text-sm font3 font-medium select-none hover:opacity-70 "
                    htmlFor="image2"
                  >
                    {images && images.image2 ? (
                      images.image2
                    ) : (
                      <>
                        Image 2
                        <img
                          className="inline-block"
                          src="./src/assets/uploadIcon.svg"
                          alt="uploadIcon"
                        />{" "}
                      </>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    {...register("image2")}
                    onChange={handleFileChange}
                    className="p-4 hidden  rounded-lg text-lg font2 font-semibold    "
                    type="file"
                    accept="image/svg,image/jpeg"
                    name="image2"
                    id="image2"
                    placeholder="Image 2"
                  />
                </div>

                <div className="name-div p-3 ">
                  <label
                    className="text-sm font3 font-medium select-none hover:opacity-70"
                    htmlFor="image3"
                  >
                    {images && images.image3 ? (
                      images.image3
                    ) : (
                      <>
                        Image 3
                        <img
                          className="inline-block"
                          src="./src/assets/uploadIcon.svg"
                          alt="uploadIcon"
                        />{" "}
                      </>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    onChange={handleFileChange}
                    {...register("image3")}
                    className="p-4 hidden rounded-lg text-lg font2 font-semibold    "
                    type="file"
                    accept="image/svg,image/jpeg"
                    name="image3"
                    id="image3"
                    placeholder="Image 3"
                  />
                </div>

                <div className="name-div p-3  ">
                  <label
                    className="text-sm font3 font-medium select-none hover:opacity-70"
                    htmlFor="image4"
                  >
                    {images && images.image4 ? (
                      images.image4
                    ) : (
                      <>
                        Image 4
                        <img
                          className="inline-block"
                          src="./src/assets/uploadIcon.svg"
                          alt="uploadIcon"
                        />{" "}
                      </>
                    )}
                  </label>{" "}
                  <br />
                  <input
                    onChange={handleFileChange}
                    {...register("image4")}
                    className="p-4 hidden rounded-lg text-lg font2 font-semibold    "
                    type="file"
                    accept="image/svg,image/jpeg"
                    name="image4"
                    id="image4"
                    placeholder="Image 4"
                  />
                </div>
              </section>
            </div>
          </section>
        </form>
      )}
    </section>

  );
}
