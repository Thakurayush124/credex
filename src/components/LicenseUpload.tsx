import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileWithPreview extends File {
  preview?: string;
}

const LicenseUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');
    
    // Validate file types and size
    const invalidFiles = acceptedFiles.filter(
      file => !file.name.toLowerCase().endsWith('.pdf') && 
              !file.name.toLowerCase().endsWith('.txt') &&
              !file.name.toLowerCase().endsWith('.doc') &&
              !file.name.toLowerCase().endsWith('.docx')
    );

    if (invalidFiles.length > 0) {
      setError('Please upload only PDF, TXT, DOC, or DOCX files.');
      return;
    }

    const oversizedFiles = acceptedFiles.filter(file => file.size > 5 * 1024 * 1024); // 5MB limit
    if (oversizedFiles.length > 0) {
      setError('Files must be smaller than 5MB.');
      return;
    }

    setFiles(acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    ));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  const removeFile = (file: FileWithPreview) => {
    setFiles(files.filter(f => f !== file));
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  };

  return (
    <section id="upload" className="section bg-gray-50">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upload Your License</h2>
          <p className="text-lg text-gray-600">
            Start by uploading your software license document. We accept PDF, DOC, DOCX, and TXT files.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-soft p-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <p className="text-lg mb-2">
              {isDragActive ? 'Drop your license file here' : 'Drag & drop your license file here'}
            </p>
            <p className="text-sm text-gray-500">or click to browse files</p>
            <p className="text-xs text-gray-400 mt-2">Maximum file size: 5MB</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-600 mt-4"
              >
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6">
            <AnimatePresence>
              {files.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <button
                onClick={() => {
                  // Here you would typically handle the file upload to your backend
                  console.log('Uploading files:', files);
                }}
                className="btn btn-primary w-full"
              >
                Submit License for Review
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6"
        >
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ol className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">1</span>
              <span>Our team will review your license details</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">2</span>
              <span>We'll verify the license validity and transferability</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">3</span>
              <span>You'll receive a valuation within 24 hours</span>
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

export default LicenseUpload;