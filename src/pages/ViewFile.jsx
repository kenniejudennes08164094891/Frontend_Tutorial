import React, { useState, useEffect } from "react";
import { getFileDetails } from "../services/transmitters";

function ViewFile() {
    const [fileProfile, setFileProfile] = useState({});

    useEffect(() => {
        const getData = getFileDetails();
        console.log("getData>>", getData);
        setFileProfile(getData);
    }, []);

    async function downloadFile() {
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
    }


    return (
        <>
            <h1 className="font-bold">View Uploaded Record</h1>
            <br />
            <div className="flex items-center justify-center">
                <div className="grid grid-rows-2 grid-cols-3 gap-4 w-full max-w-6xl p-4">
                    <div className="p-6 rounded-lg shadow">
                        <div class="ps-3">
                            <div class="text-base font-semibold">File Name</div>
                            <div class="font-normal text-gray-500">
                                {fileProfile.fileName}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg shadow">
                        <div class="ps-3">
                            <div class="text-base font-semibold">File Type</div>
                            <div class="font-normal text-gray-500">
                                {fileProfile.fileType}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg shadow">
                        <div class="ps-3">
                            <div class="text-base font-semibold">File Size</div>
                            <div class="font-normal text-gray-500">
                                {fileProfile.fileSize}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg shadow">
                        <div class="ps-3">
                            <div class="text-base font-semibold">File Extension</div>
                            <div class="font-normal text-gray-500">
                                {fileProfile.fileExtension}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg shadow">
                        <div class="ps-3">
                            <div class="text-base font-semibold">Time Uploaded</div>
                            <div class="font-normal text-gray-500">
                                {fileProfile.timeUploaded}
                            </div>
                        </div>
                    </div>
                    <div className="p-6 rounded-lg shadow">
                    </div>
                </div>
            </div>
            <br />
            <div className="flex justify-center items-center">
                <div>
                    <img src={fileProfile.base64Image} alt="" className="border border-gray-300" />
                </div>
            </div>
            <br />
            <button type="button" onClick={downloadFile} className="text-white w-200 mb-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Download File
            </button>



        </>
    )
}

export default ViewFile;