"use client";

import React from "react";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";
import clsx from "clsx";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const [message, setMessage] = React.useState<string>();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const subjectRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <SectionHeading>Contact me</SectionHeading>
      <p className="text-gray-700 -mt-5 dark:text-white/80">
        Please contact me directly at{" "}
        <Link className="underline" href="mailto:info@baranozdemir.com">
          info@baranozdemir.com
        </Link>{" "}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col "
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          emailRef.current!.value = "";
          textareaRef.current!.value = "";
          toast.success("Email sent successfully!");
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack mb-3 dark:bg-white/10 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="email"
          name="email"
          required
          placeholder="Your email*"
          ref={emailRef}
        />
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white/10 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          type="text"
          name="subject"
          required
          placeholder="Subject*"
          ref={subjectRef}
        />
        <span className="relative my-3">
          <textarea
            className="h-52 w-full rounded-lg borderBlack p-4 dark:bg-white/10 dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
            placeholder="Your message*"
            required
            maxLength={1500}
            minLength={100}
            name="message"
            ref={textareaRef}
            onChange={(e) => setMessage(e.target.value)}
          />
          {message && message.length < textareaRef.current!.minLength && (
            <span
              className={clsx("absolute bottom-5 right-5 text-xs", {
                "text-red-400":
                  message.length < textareaRef.current!.minLength ||
                  message.length > textareaRef.current!.maxLength,
              })}
            >
              {message.length} / {textareaRef.current!.minLength}
            </span>
          )}
        </span>
        <SubmitButton />
      </form>
    </motion.section>
  );
}
