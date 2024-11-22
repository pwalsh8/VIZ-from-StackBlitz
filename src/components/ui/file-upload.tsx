import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export function FileUpload({
  accept,
  maxSize,
  onUpload,
  disabled = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onUpload(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      className={`relative rounded-lg border-2 border-dashed p-6 transition-colors
        ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
      
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {selectedFile ? selectedFile.name : 'Drop your file here or click to browse'}
          </p>
          <p className="text-xs text-muted-foreground">
            {accept && `Supported formats: ${accept}`}
            {maxSize && ` (Max size: ${Math.round(maxSize / 1024 / 1024)}MB)`}
          </p>
        </div>
      </div>

      {selectedFile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={(e) => {
            e.stopPropagation();
            clearFile();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}