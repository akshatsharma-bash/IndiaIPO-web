import axios from 'axios';
import FormData from 'form-data';
import path from 'path';

export const uploadMizan = async (
    file,
    prefix = '',
    folder = ''
) => {

    try {
        if (!file) {
            return null;
        }




        const ext = path.extname(
            file.originalname
        );



        // filename
        const filename =
            `${prefix}-${Date.now()}${ext}`;



        // form data
        const formData = new FormData();

        // folder (MUST be appended before file for multer to read it)
        formData.append(
            'folder',
            folder
        );

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
                    'x-api-key':
                        process.env.UPLOAD_API_KEY
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );



        // return uploaded url
        return response.data.url || null;

    } catch (err) {

        return null;
    }

};