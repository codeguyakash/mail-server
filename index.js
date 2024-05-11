const express = require("express");

// const { SMTPServer } = require("smtp-server");

// const server = new SMTPServer({
//   allowInsecureAuth: true,
//   authOptional: true,
//   onConnect: (session, cb) => {
//     console.log(`connected ${session.id}`);
//     cb(); // for accept
//     // cb(new Error("reject")); // for reject
//   },
//   onMailFrom: (address, session, cb) => {
//     console.log(`mailfrom ${address.address} ${session.id}`);
//     cb();
//   },
//   onRcptTo: (address, session, cb) => {
//     console.log(`RcptTo ${address.address} ${session.id}`);
//     cb();
//   },
//   onData: (stream, session, cb) => {
//     stream.on("data", (data) => console.log(data.toString()));
//     stream.on("end", cb);
//   },
// });

// server.listen(25, () => console.log(`SMTP running on PORT 25`));

import express, { Request, Response } from "express";
import { Resend } from "resend";

const app = express();
const resend = new Resend("re_123456789");

app.get("/", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
