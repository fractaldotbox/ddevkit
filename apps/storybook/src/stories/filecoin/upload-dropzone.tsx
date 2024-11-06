import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X } from "lucide-react";
import React, { useState, useRef, useCallback } from "react";

type FileWithPreview = File & {
    preview: string;
};

type UploadError = {
    message: string;
    code: "FILE_TOO_LARGE" | "INVALID_TYPE" | "UPLOAD_FAILED";
};

type UploadResponse = {
    success: boolean;
    message: string;
    url?: string;
};

const UploadDropzone: React.FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [error, setError] = useState<UploadError | null>(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
        {},
    );
    const [isUploading, setIsUploading] = useState(false);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const ACCEPTED_TYPES = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
    ];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB

    const handleDragEnter = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target === dropZoneRef.current) {
            setIsDragActive(false);
        }
    };

    const handleDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
    };

    const validateFile = (file: File): UploadError | null => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            return {
                message:
                    "Invalid file type. Please upload images (JPEG, PNG, GIF) or PDF files.",
                code: "INVALID_TYPE",
            };
        }
        if (file.size > MAX_SIZE) {
            return {
                message: "File too large. Maximum size is 5MB.",
                code: "FILE_TOO_LARGE",
            };
        }
        return null;
    };

    const uploadFile = async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append("file", file);

        console.log("upload file", file);

        return {
            success: true,
            message: "File uploaded successfully",
        };
    };

    const handleFiles = useCallback(async (fileList: FileList) => {
        setError(null);
        const newFiles: FileWithPreview[] = [];

        for (const file of Array.from(fileList)) {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            newFiles.push(fileWithPreview);
        }

        setFiles((prev) => [...prev, ...newFiles]);

        // Upload files
        setIsUploading(true);
        try {
            await Promise.all(newFiles.map((file) => uploadFile(file)));
        } catch (error) {
            setError({
                message: "Failed to upload files. Please try again.",
                code: "UPLOAD_FAILED",
            });
        } finally {
            setIsUploading(false);
        }
    }, []);

    const handleDrop = (e: React.DragEvent): void => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const removeFile = (name: string): void => {
        setFiles((files) => files.filter((file) => file.name !== name));
        setUploadProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[name];
            return newProgress;
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
            <Card className="p-8">
                <div
                    ref={dropZoneRef}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}`}
                >
                    <input
                        type="file"
                        onChange={handleFileInput}
                        className="hidden"
                        multiple
                        accept={ACCEPTED_TYPES.join(",")}
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <div className="text-lg font-medium">
                            {isDragActive ? (
                                <p className="text-blue-500">Drop the files here...</p>
                            ) : (
                                <p>Drag & drop files here, or click to select files</p>
                            )}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Accepted files: Images (JPEG, PNG, GIF) and PDF
                        </p>
                        <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
                    </label>
                </div>

                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}

                {files.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h3 className="font-medium">Files:</h3>
                        {files.map((file) => (
                            <div key={file.name} className="space-y-2">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <p className="font-medium">{file.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(file.name)}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={isUploading}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                {uploadProgress[file.name] !== undefined &&
                                    uploadProgress[file.name] < 100 && (
                                        <Progress
                                            value={uploadProgress[file.name]}
                                            className="h-2"
                                        />
                                    )}
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default UploadDropzone;