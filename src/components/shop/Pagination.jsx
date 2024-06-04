"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ stats }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();

  const [current, setCurrent] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page, 10) : stats?.currentPage || 1;
  });

  const pages = useMemo(() => {
    return Array.from({ length: stats?.totalPages || 1 }, (_, i) => i + 1);
  }, [stats?.totalPages]);

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.set("page", current);

    router.push(`${pathname}?${updatedParams.toString()}`);
  }, [current]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      setCurrent(1);
    }
  }, [stats?.totalPages]);

  useEffect(() => {
    setCurrent(stats?.currentPage || 1);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 p-4 py-6 mt-8 font-mono text-2xl border rounded border-gray-200/70 bg-slate-100/10">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrent(page)}
          className={`px-6 py-1 border rounded-md hover:shadow-md transition-all ${
            page === current ? "bg-slate-200/40 border-primary" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
