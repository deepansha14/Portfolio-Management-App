"use client";

import React from "react";

interface FileUploadProps {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({
  label,
  name,
  required = false,
  className = "",
  onChange,
}: FileUploadProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        accept="image/*,.pdf"
        name={name}
        required={required}
        max-size={2097152}
        onChange={onChange}
        className="block w-full text-sm border rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}
