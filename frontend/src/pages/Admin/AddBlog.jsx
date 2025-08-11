import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import { Trash } from "lucide-react";
import Quill from "quill";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import axios from "axios";
const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [blogResponse, setBlogResponse] = useState("");

  const [file, setFile] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("startup");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const uploadFile = async (e) => {
    inputRef.current.click();
  };

  const generateContent = async () => {
    console.log("Generating");
    let prompt = `${blogTitle} + ${subTitle}`;
    try {
      const res = await axiosInstance.post(`/api/v1/generate`, {
        prompt,
      });
      console.log(res);
      if (res.data && res.data.success) {
        let cleanedContent = res.data.content
          .replace(/^```json\s*/, "")
          .replace(/```$/, "");
        setBlogResponse(cleanedContent);
      }
    } catch (error) {
      console.log(error)
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      }
    }
    console.log("Generated");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!file || !blogTitle || !description || !category) {
        console.log("Please fill all the required fills!");
        return;
      }
      const formData = new FormData();
      formData.append("title", blogTitle);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isPublish", isPublished);
      formData.append("image", file);
      const res = await axiosInstance.post("/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.data.message);
      }
    }
    setBlogTitle("");
    setSubTitle("");
    setDescription("");
    setIsPublished(false);
    setFile(null);
    setCategory("startup");
    if (quillRef.current) {
      quillRef.current.setText("");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Type Here...",
      });
      quillRef.current.on("text-change", () => {
        const html = editorRef.current.querySelector(".ql-editor").innerHTML;
        setDescription(html);
      });
    }
  }, []);
  useEffect(() => {
    if (blogResponse && quillRef.current) {
      try {
        const parsed = JSON.parse(blogResponse); // Parse AI JSON
        let html = `<h1>${parsed.title}</h1>`;
  
        parsed.sections.forEach(section => {
          html += `<h2>${section.subheading}</h2>`;
          html += `<p>${section.text}</p>`;
        });
  
        quillRef.current.root.innerHTML = html;
        setDescription(html); // keep in state too
      } catch (err) {
        console.error("Error parsing AI content:", err);
      }
    }
  }, [blogResponse]);
  

  return (
    <div className="w-full h-full bg-blue-50/50 pt-7 px-6 overflow-scroll relative overflow-x-hidden">
      {loading ? (
        <div className="absolute w-screen h-[150%] bg-black/50 z-100 top-0 -left-50 max-sm:left-0">
          <Loading />
        </div>
      ) : null}
      <form onSubmit={onSubmitHandler}>
        <div className="max-w-3xl bg-white flex flex-col shadow-md rounded-lg shadow-gray-300 mb-10 ">
          <div className="flex flex-col pt-6 px-5 gap-4 relative">
            <h5 className="text-gray-400">Upload Thumbnail</h5>
            <input
              required
              ref={inputRef}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              type="file"
              className="hidden"
              name=""
              id=""
            />
            {!file ? (
              <img
                onClick={() => uploadFile()}
                src={assets.upload_area}
                className="w-30 cursor-pointer"
                alt=""
              />
            ) : (
              <div className="group">
                <img
                  className="w-30 brightness-100 group-hover:brightness-55 transition"
                  src={URL.createObjectURL(file)}
                />
                <Trash
                  onClick={() => setFile(null)}
                  className="absolute bottom-15 left-18 text-red-500 transition-all hover:scale-110 hidden group-hover:block cursor-pointer"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col pt-6 px-5 gap-3">
            <h5 className="text-gray-400">Blog Title</h5>
            <div
              className={` max-w-[400px] py-1 px-3 rounded-sm border border-dashed`}
            >
              <input
                required
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                type="text"
                placeholder="Type here"
                className="outline-none w-full focus:cursor-none"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex flex-col pt-6 px-5 gap-3">
            <h5 className="text-gray-400">Sub Title</h5>
            <div className="max-w-[400px] py-1 px-3 rounded-sm border border-dashed ">
              <input
                required
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                type="text"
                placeholder="Type here"
                className="outline-none w-full"
                name=""
                id=""
              />
            </div>
          </div>

          <div className="flex flex-col pt-6 px-5 gap-3 ">
            <h5 className="text-gray-400">Blog Description</h5>
            <div className="max-w-lg h-74 pb-16 m:pb-10 pt-2 relative">
              <div className="" ref={editorRef}></div>
              <button
                className="xsClass absolute xs:bottom-0 bottom-7  right-3 ml-2 text-xs text-white bg-black/70 px-4 py-2 rounded hover:underline cursor-pointer"
                onClick={generateContent}
                type="button"
              >
                Generate with AI
              </button>
            </div>
          </div>
          <div className="flex flex-col  pt-3 px-5 gap-2 mb-5">
            <h5 className="text-gray-400">Blog Category</h5>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              name="category"
              className="w-40 mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-0 rounded"
            >
              {/* <option value="">Select Category</option> */}
              {blogCategories.map((item, idx) => (
                <option key={idx} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="px-5 py-3 flex gap-3 items-center">
            <p className="text-gray-400">Publish Now</p>
            <input
              value={isPublished}
              type="checkbox"
              checked={isPublished}
              className="scale-125 cursor-pointer"
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>
          <div className="w-40 px-4 py-2 ml-4.5 mb-5 flex items-center justify-center bg-primary/40 rounded-md shadow-md shadow-gray-500 group">
            <button
              className="outline-0 group-hover:cursor-pointer "
              type="submit"
            >
              Upload Blog
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
