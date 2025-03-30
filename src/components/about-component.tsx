"use client";

import Link from "next/link";
import React from "react";

export default function AboutComponent() {
  return (
    <>
      <h1>About Page</h1>
      <p>
        <Link href="/">&larr; Go Back</Link>
      </p>
    </>
  );
}
