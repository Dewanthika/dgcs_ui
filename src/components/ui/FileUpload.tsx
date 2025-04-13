import clsx from "clsx";
import { ImagePlus } from "lucide-react";
import { forwardRef, InputHTMLAttributes } from "react";

interface IFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ label, error, helperText, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        {/* Custom File Upload Button */}
        <label
          htmlFor="file_input"
          className={clsx(
            "flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition",
            "hover:bg-gray-100",
            {
              "border-red-600": error,
              "border-gray-300": !error,
            }
          )}
        >
          <ImagePlus className="w-12 h-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Choose product images</p>
          <p className="text-xs text-gray-400">
            Click to browse or drag and drop
          </p>
        </label>

        {/* Hidden Input */}
        <input
          id="file_input"
          type="file"
          {...props}
          ref={ref}
          className="hidden"
          onChange={(e) => {
            onChange?.(e);
          }}
        />

        {/* Helper & Error Text */}
        {helperText && !error && (
          <small className="text-gray-500 text-sm">{helperText}</small>
        )}
        {error && <small className="text-red-600 text-sm">{error}</small>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
