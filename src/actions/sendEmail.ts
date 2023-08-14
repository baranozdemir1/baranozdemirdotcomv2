"use server";
import { getErrorMessage, validateString } from "@/lib/utils";
import { Resend } from "resend";
import ContactForm from "@/email/ContactForm";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("email");
  const message = formData.get("message");
  const subject = formData.get("subject");

  if (!validateString(senderEmail)) return { error: "Invalid sender email" };
  if (!validateString(message)) return { error: "Invalid message" };
  if (!validateString(subject)) return { error: "Invalid subject" };

  let data;
  try {
    data = await resend.emails.send({
      from: "Contact Form from Baran Özdemir <onboarding@resend.dev>",
      to: "info@baranozdemir.com",
      subject: subject as string,
      reply_to: senderEmail as string,
      // html: message as string,
      react: React.createElement(ContactForm, {
        message: message as string,
        email: senderEmail as string,
      }),
    });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }

  return {
    data,
  };
};
