"use client";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 const lastSegment = pathname.split("/").filter(Boolean).pop();
 const formatSegment = (segment: string | undefined) => {
    if (!segment) return "";
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
 return (
   <span>
     {course?.name} &gt; {formatSegment(lastSegment)}
   </span>
);}
