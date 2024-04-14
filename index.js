import { SMTPServer } from "smtp-server";

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect: (session, cb) => {
    console.log(`connected ${session.id}`);
    cb();
  },
  onMailFrom: (address, session, cb) => {
    console.log(`mailfrom ${address.address} ${session.id}`);
    cb();
  },
  onRcptTo: (address, session, cb) => {
    console.log(`RcptTo ${address.address} ${session.id}`);
    cb();
  },
  onData: (stream, session, cb) => {
    stream.on("data", (data) => console.log(data.toString()));
    stream.on("end", cb);
  },
});

server.listen(25, () => console.log(`SMTP running on PORT 25`));
