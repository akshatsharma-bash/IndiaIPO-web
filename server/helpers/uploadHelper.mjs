import axios from 'axios';
import FormData from 'form-data';
import path from 'path';

export const uploadFile = async (file, folder = 'misc') => {

    // extension
    const ext = path.extname(file.originalname);

    // random string
    const randomString = Math.random()
        .toString(36)
        .substring(2, 10);

    // final filename
    const filename =
        `${folder}_${Date.now()}${randomString}${ext}`;

    // form data
    const formData = new FormData();

    formData.append('folder', folder);

    formData.append(
        'file',
        file.buffer,
        filename
    );

    // upload api hit
    const uploadUrl = new URL(process.env.UPLOAD_API_URL);
    uploadUrl.searchParams.append('folder', folder);

    const response = await axios.post(
        uploadUrl.toString(),
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                'x-api-key': process.env.UPLOAD_API_KEY
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        }
    );

    return response.data.url;
};