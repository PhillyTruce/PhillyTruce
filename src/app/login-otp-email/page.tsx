'use client'
import React from "react";
import Otp from "./otp-submission";

export default function Main() {
  return (
    <div id="otp-page" className="mt-36 w-full mx-4">
      <h3 className="text-2xl text-primary font-semibold mb-2">
        Confirm your email
      </h3>
      <p className="text-sm opacity-60">
        Enter the code that we just emailed you
      </p>
      <Otp />
      <p className="my-4 text-xs text-accent2 text-center">
        Didn&apos;t get the code?{" "}
        <a href="#" className="text-xs text-link underline font-normal">
          Resend code
        </a>
      </p>
    </div>
  );
}
