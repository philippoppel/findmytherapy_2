"use client";

import React from "react";

export const ExportButton = ({ data }: { data: unknown }) => {
  const handleExport = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "psy-matching-export.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-full bg-orange px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:brightness-110"
    >
      Export (JSON)
    </button>
  );
};
