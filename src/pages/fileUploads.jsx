import React, { useState } from "react";
import { setUploadedFileData, getUploadedFile, setFileDetails } from "../services/transmitters";
import { useNavigate } from "react-router-dom";

const FileUploads = () => {
    const [showModal, setShowModal] = useState(false);
    const [fileDB, setFileDB] = useState([]);
    let [uploadedFile, setUploadedFile] = useState("");
    let [fileData, setFileData] = useState({})
    const [showFileUploaded, setShowFileUploaded] = useState(false);
    const [showUpdateModal, setUpdateModal] = useState(false);
    const navigate = useNavigate();
    const [editDescription, setEditDescription] = useState("");

    const handleChange = (event) => {
        const currentTime = new Date();
        const fileProperties = event.target.files[0]; //It is called a Blob file
        let fileProps = {
            fileName: fileProperties?.name,
            fileSize: `${fileProperties?.size / 1000} KB`,
            fileType: fileProperties?.type,
            fileExtension: fileProperties?.name?.split(".")[1],
            timeUploaded: `${currentTime?.toDateString()}-${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
        }

        // step1: The Base64 string method
        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileProperties);
        fileReader.onload = (_event) => {
            setShowFileUploaded(true);
            setFileData({ ...fileProps, base64Image: fileReader.result });
        }
    }


    const handleSubmit = async () => {
        setShowModal(false);
        await setUploadedFileData(fileData);

        setTimeout(async () => {
            const getRecord = await getUploadedFile();
            const transformArray = getRecord.map((item, index) => ({
                id: index + 1,
                fileId: `file ${index + 1}`,
                ...item
            }))
            setFileDB(transformArray);
            //  console.log("transformArray>>",transformArray);
        }, 200)
    }




    const handleView = (file) => {
        //   console.log("file>>",file);
        setFileDetails(file)
        navigate("/view-file");
    };

    const handleEdit = (file) => {
        setUpdateModal(true);
        setEditDescription(`Ready to replace ${file.fileName}?`);
        setShowFileUploaded(false);
    };

    const handleDelete = (id) => {
        console.log("row id to delete>>", id);
        const filterData = fileDB.filter((item) => item.id !== id);
        setFileDB(filterData);
    };

    const handleDownload = async (fileProfile) => {
        try {
            const img = new Image();
            img.src = fileProfile?.base64Image;

            // Fetch the receipt as a blob
            const res = await fetch(fileProfile?.base64Image);
            if (!res.ok) {
                console.error("Failed to fetch payment receipt");
                return;
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileProfile.fileName}.png`;

            // Trigger the download
            a.click();

            // Clean up the URL object
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading payment receipt:', error);
        }
    };

    // CRUD: Create: inputting a form, uploading a file etc,
    // Read: Displaying the submitted records on the screen i.e table, grid etc,
    // Update: Modify the existing data in the record, 
    // Delete: to remove a particular record from the table

    // methods for file uploads: 
    // Base64 string: set of random characters represnting a media file e.g png, jgp, pdf, mp3,mp4
    // Form Data: inner js form data object library, 


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Base64 String File Uploads</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Upload Files
                </button>
            </div>

            {/* Table Component */}

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">file Id</th>
                            <th className="px-4 py-2 text-left">File Name</th>
                            <th className="px-4 py-2 text-left">fileExtension</th>
                            <th className="px-4 py-2 text-left">File Size</th>
                            <th className="px-4 py-2 text-left">Time Uploaded</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileDB.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.fileId}</td>
                                <td className="px-4 py-2">{item.fileName}</td>
                                <td className="px-4 py-2">{item.fileExtension}</td>
                                <td className="px-4 py-2">{item.fileSize}</td>
                                <td className="px-4 py-2">{item.timeUploaded}</td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => handleView(item)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleDownload(item)}
                                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-sm"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* File Uploads Modal */}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    {
                                        showFileUploaded === true ?
                                            <>
                                                <p className="text-xs text-gray-500">File selected successfully!</p>
                                            </>
                                            :
                                            <>
                                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </>
                                    }
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" value={uploadedFile} name="uploadedFile" onChange={(event) => handleChange(event)} />
                            </label>
                        </div>
                        <br />

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <>

                {/* Modal Overlay */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        {/* Modal Content */}
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Update File</h2>
                                <button
                                    onClick={() => setUpdateModal(false)}
                                    className="text-gray-500 hover:text-red-500 text-xl font-bold"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 hover:border-gray-400">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        {
                                            showFileUploaded === true ?
                                                <>
                                                    <p className="text-xs text-gray-500">File selected Successfully!</p>
                                                </>
                                                :
                                                <>
                                                    <p className="text-xs text-gray-500">{editDescription}</p>
                                                </>
                                        }
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" value={uploadedFile} name="uploadedFile" onChange={(event) => handleChange(event)} />
                                </label>

                            </div>


                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    // onClick={handleSubmit}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>


                        </div>

                    </div>
                )}
            </>

        </div>
    );
}

export default FileUploads;